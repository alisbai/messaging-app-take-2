package com.example.authapi.configs;

import com.example.authapi.services.JwtService;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service("jwtChannelInterceptor")
public class JwtChannelInterceptor implements ChannelInterceptor {

    JwtService jwtService;
    UserDetailsService userDetailsService;

    public JwtChannelInterceptor(JwtService jwtService, UserDetailsService userDetailsService) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor =
                MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
        if (StompCommand.CONNECT.equals(accessor.getCommand())) {
            final String requestTokenHeader = accessor.getFirstNativeHeader("Authorization");
            String username = null;
            String jwtToken = null;

            if(requestTokenHeader != null && requestTokenHeader.startsWith("Bearer ")) {
                jwtToken = requestTokenHeader.substring(7);

                try {
                    username = jwtService.extractUsername(jwtToken);
                } catch (Exception e) {
                    System.out.println("unexpected error occurred: " + e.getMessage());
                }
            }
            if(username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                try {
                    UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                    if(jwtService.isTokenValid(jwtToken, userDetails)) {
                        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(userDetails, null, null);
                        accessor.setUser(usernamePasswordAuthenticationToken);
                    }
                } catch (UsernameNotFoundException e) {
                    System.out.println("Could not create userDetails with " + username);
                }
            }
        }
        return message;
    }
}
