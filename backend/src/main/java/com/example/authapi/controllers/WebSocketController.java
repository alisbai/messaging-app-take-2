package com.example.authapi.controllers;


import com.example.authapi.entities.Message;
import com.example.authapi.entities.User;
import com.example.authapi.responses.UserResponse;
import com.example.authapi.services.MessageService;
import com.example.authapi.services.UserService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Controller
public class WebSocketController {
    private MessageService messageService;
    private UserService userService;

    @Autowired
    public WebSocketController(MessageService messageService, UserService userService) {
        this.messageService = messageService;
        this.userService = userService;
    }
    @MessageMapping("/app/chat")
    @SendTo("/topic/messages")
    public Map<String, Object> handleChatMessage(@RequestParam String message) {
        try {
            User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            Integer messageId = messageService.createMessageForUser(user.getId(), message);
            Optional<Message> optionalMessage = messageService.getMessage(messageId);
            Optional<User> optionalUser = userService.getUser(user.getId());
            Optional<UserResponse> optionalUserDTO = optionalUser.map(mappedUser -> UserResponse.builder()
                    .id(mappedUser.getId())
                    .isOnline(mappedUser.getIsOnline())
                    .fullName(mappedUser.getFullName())
                    .email(mappedUser.getEmail())
                    .build()
            );
            Map<String, Object> response = new HashMap<>();
            response.put("user", optionalUserDTO.orElse(null));
            response.put("message", optionalMessage.orElse(null));
            return response;

        } catch (EntityNotFoundException e) {
            return null;
        }
    }
}
