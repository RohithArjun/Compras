package com.Kabirarjun.Compras.repo;


import com.Kabirarjun.Compras.Dto.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class LoginRepo  {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public User findById(String email, String password) {
        String sql = "SELECT * FROM account WHERE email = ? AND password = ?";

        return jdbcTemplate.queryForObject(
                sql,
                new Object[]{email, password},
                (rs, rowNum) -> {
                    User user = new User();
                    user.setEmail(rs.getString("email"));
                    user.setPassword(rs.getString("password"));
                    user.setFirstName(rs.getString("firstName"));
                    user.setLastName(rs.getString("lastName"));
                    user.setPhoneNumber(rs.getString("phoneNumber"));
                    user.setUserRole(rs.getString("userRole"));
                    return user;
                }
        );
    }

    public void saveUser(User user) {
        String sql = "INSERT INTO account (email, password, firstName, lastName, phoneNumber, userRole) VALUES (?, ?, ?, ?, ?, ?)";
        jdbcTemplate.update(sql,
                user.getEmail(),
                user.getPassword(),
                user.getFirstName(),
                user.getLastName(),
                user.getPhoneNumber(),
                user.getUserRole());
    }
}
