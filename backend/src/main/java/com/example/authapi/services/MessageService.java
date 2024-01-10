package com.example.authapi.services;

import com.example.authapi.entities.Message;
import com.example.authapi.entities.User;
import com.example.authapi.repositories.MessageRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service("messageService")
public class MessageService {

    private MessageRepository messageRepository;
    private UserService userService;

    public MessageService() {

    }

    @Autowired
    public MessageService(MessageRepository messageRepository, UserService userService) {
        this.messageRepository = messageRepository;
        this.userService = userService;
    }

    public List<Message> findAllMessages() {
        return messageRepository.findAll();
    }

    public Integer createMessageForUser(Integer userId, String messageContent) throws EntityNotFoundException {
        Optional<User> optionalUser = userService.getUser(userId);
        if(optionalUser.isPresent()){
            User user = optionalUser.get();
            Message message = Message.builder().user(user).content(messageContent).build();
            return messageRepository.saveAndFlush(message).getId();
        }
        throw new EntityNotFoundException();
    }

    public Optional<Message> getMessage(Integer id) {
        return messageRepository.findById(id);
    }
}
