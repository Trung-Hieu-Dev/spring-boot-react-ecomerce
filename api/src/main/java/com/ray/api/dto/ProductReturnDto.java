package com.ray.api.dto;

import com.ray.api.entity.Product;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class ProductReturnDto {
    private Long id;
    private String name;
    private String description;
    private BigDecimal unitPrice;
    private String imageUrl;
    private int unitsInStock;
    private String brand;
    private String category;
    
    public ProductReturnDto() {
    }
    
    public ProductReturnDto(Product product) {
        this.id = product.getId();
        this.name = product.getName();
        this.description = product.getName();
        this.unitPrice = product.getUnitPrice();
        this.imageUrl = product.getImageUrl();
        this.unitsInStock = product.getUnitsInStock();
        this.brand = product.getBrand();
        this.category = product.getCategory().getCategoryName();
    }
}
