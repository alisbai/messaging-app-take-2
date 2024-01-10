package com.example.authapi.configs;

    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.beans.factory.annotation.Qualifier;
    import org.springframework.context.ApplicationEventPublisher;
    import org.springframework.context.annotation.Bean;
    import org.springframework.context.annotation.Configuration;
    import org.springframework.messaging.Message;
    import org.springframework.messaging.handler.invocation.HandlerMethodArgumentResolver;
    import org.springframework.messaging.simp.config.ChannelRegistration;
    import org.springframework.messaging.simp.config.MessageBrokerRegistry;
    import org.springframework.messaging.support.ChannelInterceptor;
    import org.springframework.security.authorization.AuthenticatedAuthorizationManager;
    import org.springframework.security.authorization.AuthorizationEventPublisher;
    import org.springframework.security.authorization.AuthorizationManager;
    import org.springframework.security.authorization.SpringAuthorizationEventPublisher;
    import org.springframework.security.config.annotation.web.socket.EnableWebSocketSecurity;
    import org.springframework.security.messaging.access.intercept.AuthorizationChannelInterceptor;
    import org.springframework.security.messaging.access.intercept.MessageMatcherDelegatingAuthorizationManager;
    import org.springframework.security.messaging.context.AuthenticationPrincipalArgumentResolver;
    import org.springframework.security.messaging.context.SecurityContextChannelInterceptor;
    import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
    import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
    import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

    import java.util.List;

    import static org.springframework.messaging.simp.SimpMessageType.*;


@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfiguration implements WebSocketMessageBrokerConfigurer {

    @Qualifier("jwtChannelInterceptor")
    private ChannelInterceptor channelInterceptor;
    private ApplicationEventPublisher applicationEventPublisher;

    public WebSocketConfiguration() {
    }

    @Autowired
    public WebSocketConfiguration(ChannelInterceptor customChannelInterceptor, ApplicationEventPublisher applicationEventPublisher) {
        this.channelInterceptor = customChannelInterceptor;
        this.applicationEventPublisher = applicationEventPublisher;
    }
    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/topic");
        config.setUserDestinationPrefix("/app");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws")
                .setAllowedOrigins("http://localhost:5173/");
    }

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> argumentResolvers) {
        argumentResolvers.add(new AuthenticationPrincipalArgumentResolver());
    }

    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        AuthorizationManager<Message<?>> myAuthorizationRules = AuthenticatedAuthorizationManager.authenticated();
        AuthorizationChannelInterceptor authz = new AuthorizationChannelInterceptor(myAuthorizationRules);
        AuthorizationEventPublisher publisher = new SpringAuthorizationEventPublisher(applicationEventPublisher);
        authz.setAuthorizationEventPublisher(publisher);
        registration.interceptors(channelInterceptor, new SecurityContextChannelInterceptor(), authz);
    }


    @Bean
    AuthorizationManager<Message<?>> messageAuthorizationManager() {
        MessageMatcherDelegatingAuthorizationManager.Builder messages = MessageMatcherDelegatingAuthorizationManager.builder();
        messages
                .simpTypeMatchers(CONNECT, UNSUBSCRIBE, DISCONNECT, HEARTBEAT)
                .permitAll()
                .simpDestMatchers("/app/**")
                .authenticated()
                .anyMessage()
                .denyAll();

        return messages.build();
    }

}

