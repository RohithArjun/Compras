package com.Kabirarjun.Compras.Dto;

import org.springframework.boot.autoconfigure.jdbc.JdbcTemplateAutoConfiguration;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Repository
public class ProductJdbcRepo {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<Product> findAll() {
        String sql = "SELECT * FROM product";
        return jdbcTemplate.query(sql, (rs, rowNum) -> {
            Product p = new Product();
            p.setId(rs.getInt("id"));
            p.setName(rs.getString("name"));
            p.setBrand(rs.getString("brand"));
            p.setCategory(rs.getString("category"));
            p.setDescription(rs.getString("description"));
            p.setPrice(rs.getBigDecimal("price"));
            p.setReleaseDate(rs.getDate("release_date"));
            p.setProductAvailable(rs.getBoolean("product_available"));
            p.setStockQuantity(rs.getInt("stock_quantity"));
            p.setImageName(rs.getString("image_name"));
            p.setImageType(rs.getString("image_type"));
            p.setImageData(rs.getBytes("image_data"));
            return p;
        });
    }

    public Product findById(int id) {
        String sql = "SELECT * FROM product WHERE id = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{id}, (rs, rowNum) -> {
            Product p = new Product();
            p.setId(rs.getInt("id"));
            p.setName(rs.getString("name"));
            p.setBrand(rs.getString("brand"));
            p.setCategory(rs.getString("category"));
            p.setDescription(rs.getString("description"));
            p.setPrice(rs.getBigDecimal("price"));
            p.setReleaseDate(rs.getDate("release_date"));
            p.setProductAvailable(rs.getBoolean("product_available"));
            p.setStockQuantity(rs.getInt("stock_quantity"));
            p.setImageName(rs.getString("image_name"));
            p.setImageType(rs.getString("image_type"));
            p.setImageData(rs.getBytes("image_data"));
            return p;
        });
    }

    public Product save(Product product) {
        String sql = "INSERT INTO product (name, price, description, brand, category, release_date, product_available, stock_quantity, image_name, image_type, image_data) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
         jdbcTemplate.update(sql,
                product.getName(),
                product.getPrice(),
                product.getDescription(),
                product.getBrand(),
                product.getCategory(),
                product.getReleaseDate(),
                product.isProductAvailable(),
                product.getStockQuantity(),
                product.getImageName(),
                product.getImageType(),
                product.getImageData()
        );
         return product; // In a real implementation, you would return the saved product with its generated ID
    }

    public Product updateProduct(int id ,Product product) {
        String sql = "UPDATE product SET name = ?, price = ?, description = ?, brand = ?, category = ?, release_date = ?, product_available = ?, stock_quantity = ?, image_name = ?, image_type = ?, image_data = ? WHERE id = ?";
        jdbcTemplate.update(sql,
                product.getName(),
                product.getPrice(),
                product.getDescription(),
                product.getBrand(),
                product.getCategory(),
                product.getReleaseDate(),
                product.isProductAvailable(),
                product.getStockQuantity(),
                product.getImageName(),
                product.getImageType(),
                product.getImageData(),
                product.getId()
        );
        return product; // In a real implementation, you would return the saved product with its generated ID
    }

    public void deleteById(int id) {
        String sql = "DELETE FROM product WHERE id = ?";
        jdbcTemplate.update(sql, id);
    }

    public List<Product> getProductsbyKeyword(String keyword) {
        String sql = "SELECT * FROM product WHERE " +
                "LOWER(name) LIKE LOWER(CONCAT('%', ?, '%')) OR " +
                "LOWER(description) LIKE LOWER(CONCAT('%', ?, '%')) OR " +
                "LOWER(brand) LIKE LOWER(CONCAT('%', ?, '%')) OR " +
                "LOWER(category) LIKE LOWER(CONCAT('%', ?, '%'))";
        return jdbcTemplate.query(sql, new Object[]{keyword, keyword, keyword, keyword}, (rs, rowNum) -> {
            Product p = new Product();
            p.setId(rs.getInt("id"));
            p.setName(rs.getString("name"));
            p.setBrand(rs.getString("brand"));
            p.setCategory(rs.getString("category"));
            p.setDescription(rs.getString("description"));
            p.setPrice(rs.getBigDecimal("price"));
            p.setReleaseDate(rs.getDate("release_date"));
            p.setProductAvailable(rs.getBoolean("product_available"));
            p.setStockQuantity(rs.getInt("stock_quantity"));
            p.setImageName(rs.getString("image_name"));
            p.setImageType(rs.getString("image_type"));
            p.setImageData(rs.getBytes("image_data"));
            return p;
        });
    }


    // Add insert, update, delete methods similarly
}
