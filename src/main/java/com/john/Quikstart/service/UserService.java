package com.john.Quikstart.service;

import com.john.Quikstart.model.User;
import com.john.Quikstart.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public User updateUser(Long id, User userDetails) {
        User user = userRepository.findById(id).orElse(null);
        if (user != null) {
            user.setName(userDetails.getName());
            user.setCountry(userDetails.getCountry());
            return userRepository.save(user);
        }
        return null;
    }

    public String initializeSampleData() {
        userRepository.deleteAll();

        User user1 = new User("Yohannes", "Ethiopia");
        User user2 = new User("Getasew", "Ethiopia");
        User user3 = new User("Emebet", "Ethiopia");

        userRepository.save(user1);
        userRepository.save(user2);
        userRepository.save(user3);

        return "Sample data initialized successfully!";
    }
}