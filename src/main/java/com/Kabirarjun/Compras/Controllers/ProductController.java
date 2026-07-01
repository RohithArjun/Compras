package com.Kabirarjun.Compras.Controllers;


import com.Kabirarjun.Compras.Dto.Product;
import com.Kabirarjun.Compras.Services.ProductService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Objects;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class ProductController {

    private static final Logger log = LoggerFactory.getLogger(ProductController.class);
    @Autowired
    ProductService productService;


    private final ObjectMapper objectMapper = new ObjectMapper();

    @GetMapping("/products")
    public ResponseEntity<List<Product>> getProducts(){

        return new ResponseEntity<>(productService.getProducts(), HttpStatus.OK);
    }

    @GetMapping("/product/{id}")
    public ResponseEntity<Product> getProductbyId(@PathVariable int id)
    {
        Product prod= productService.getProductbyId(id);
        if(Objects.isNull(prod)) {
            return new ResponseEntity<>(prod, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(prod, HttpStatus.OK);
    }

    @PostMapping("/product")
    public ResponseEntity<?> addProduct(@RequestPart Product product, @RequestPart(required = false) MultipartFile imageFile)
    {
        try{
            Product product1 =   productService.addProduct(product,imageFile);
            String productjson = objectMapper.writeValueAsString(product1);
            return new ResponseEntity<>(product1,HttpStatus.CREATED);

        }
        catch (Exception e)
        {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PutMapping("/product/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable int id , @RequestPart Product product, @RequestPart(required = false) MultipartFile imageFile)
    {
        try {
            Product prod = productService.updateProduct(id, product, imageFile);
            String productjson = objectMapper.writeValueAsString(prod);
            return new ResponseEntity<>(prod, HttpStatus.OK);
        }
        catch (Exception e)
        {
            log.error("Error updating product with id {}: {}", id, e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/product/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable int id) throws JsonProcessingException {
        Product prod = productService.getProductbyId(id);
        if(Objects.isNull(prod))
        {
            return new ResponseEntity<>("Product not found", HttpStatus.NOT_FOUND);
        }
        else
        {
            productService.deleteProduct(id);
            String productjson = objectMapper.writeValueAsString(prod);
            return new ResponseEntity<>("Product deleted successfully", HttpStatus.OK);
        }
    }
    @GetMapping("/product/{id}/image")
    public ResponseEntity<byte[]> getProductImagebyId(@PathVariable int id)
    {
        Product prod= productService.getProductbyId(id);
        byte[] image = prod.getImageData();
        String imageType = prod.getImageType();

        if (imageType == null || imageType.trim().isEmpty()) {
            imageType = "application/octet-stream";
        }

        MediaType mediaType = MediaType.parseMediaType(imageType);

        return ResponseEntity.ok().contentType(mediaType).body(image);
    }

    @GetMapping("/products/search")
    public ResponseEntity<List<Product>> searchProducts(@RequestParam String keyword) {
        List<Product> products = productService.getProductsbyKeyword(keyword);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }
}
