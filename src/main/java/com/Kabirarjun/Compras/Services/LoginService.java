package com.Kabirarjun.Compras.Services;

import com.Kabirarjun.Compras.Dto.User;
import com.Kabirarjun.Compras.repo.LoginRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

    @Autowired
    LoginRepo repo;


    public User getUser(String email,String password) {
        return repo.findById(email,password);
    }

    public void setUser(User user) {
        repo.saveUser(user);
    }
}
