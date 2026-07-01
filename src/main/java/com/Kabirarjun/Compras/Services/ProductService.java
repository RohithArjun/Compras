package com.Kabirarjun.Compras.Services;

import com.Kabirarjun.Compras.Dto.Product;
import com.Kabirarjun.Compras.Dto.ProductJdbcRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@Service
public class ProductService {

    @Autowired
    ProductJdbcRepo productRepo;

    //List<ProductDto> products= new ArrayList<>(Arrays.asList( new ProductDto("1","Shirt","6000"),new ProductDto("2","pant","2000")));

    public List<Product> getProducts(){
        return productRepo.findAll();
    }

    public Product getProductbyId(int id){
        return productRepo.findById(id);
    }

    public Product addProduct(Product prod, MultipartFile imageFile){
        if(imageFile!=null && !imageFile.isEmpty())
        {
            try{
                prod.setImageName(imageFile.getOriginalFilename());
                String imageType = prod.getImageType();
                if (imageType == null || imageType.trim().isEmpty()) {
                    imageType = "application/octet-stream"; // or "image/png" if you expect PNGs
                }
                prod.setImageType(imageType);
                prod.setImageData(imageFile.getBytes());
            }
            catch (Exception e)
            {
                throw new RuntimeException("Failed to store image file: " + e.getMessage());
            }
        }
       return productRepo.save(prod);
    }

    public Product updateProduct(int id , Product prod,MultipartFile imageFile) throws IOException {

        prod.setImageName(imageFile.getOriginalFilename());
        String imageType = prod.getImageType();
        if (imageType == null || imageType.trim().isEmpty()) {
            imageType = "application/octet-stream"; // or "image/png" if you expect PNGs
        }
        prod.setImageType(imageType);
        prod.setImageData(imageFile.getBytes());
        return productRepo.updateProduct(id,prod);
    }

    public void deleteProduct(int id) {
    productRepo.deleteById(id);
    }

    public List<Product> getProductsbyKeyword(String keyword) {
        return productRepo.getProductsbyKeyword(keyword);
    }
}
