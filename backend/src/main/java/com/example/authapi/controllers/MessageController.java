package com.example.authapi.controllers;

import com.example.authapi.entities.Message;
import com.example.authapi.responses.UserResponse;
import com.example.authapi.services.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(("api/v1/messages"))

public class MessageController {
    private MessageService messageService;

    public MessageController(){}
    @Autowired
    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }
    @GetMapping("/index")
    public ResponseEntity<List<Map>> geMessages() {
        List<Message> messages = messageService.findAllMessages();
        List<Map> response = new ArrayList<>();
        for(Message message: messages) {
            Map<String, Object> payload = new HashMap<>();
            payload.put("message", message);
            UserResponse userResponse = UserResponse.builder()
                    .id(message.getUser().getId())
                    .fullName(message.getUser().getFullName())
                    .email(message.getUser().getEmail())
                    .isOnline(message.getUser().getIsOnline())
                    .build();
            payload.put("user", userResponse);
            response.add(payload);
        }
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
