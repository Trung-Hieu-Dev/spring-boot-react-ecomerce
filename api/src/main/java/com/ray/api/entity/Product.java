package com.ray.api.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "product")
@Getter
@Setter
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "name")
    private String name;
    
    private String description;
    
    @Column(name = "unit_price")
    private BigDecimal unitPrice;
    
    @Column(name = "image_url")
    private String imageUrl;
    
    @Column(name = "units_in_stock")
    private int unitsInStock;
    
    private String brand;
    
    @Column(name = "date_created")
    @CreationTimestamp
    private Date dateCreated;
    
    @Column(name = "last_updated")
    @UpdateTimestamp
    private Date lastUpdated;
    
    @ManyToOne
    @JoinColumn(name = "category_id")
//    @JsonIgnore // to remove field caused infinite recursion
    private ProductCategory category;
    
    @OneToOne
    @PrimaryKeyJoinColumn
    @JsonIgnore
    private BasketItem basketItem;
    
    public Product() {
    }
    
    public Product(
            String name, String description, BigDecimal unitPrice, String imageUrl, int unitsInStock, String brand,
            Date dateCreated, Date lastUpdated) {
        this.name = name;
        this.description = description;
        this.unitPrice = unitPrice;
        this.imageUrl = imageUrl;
        this.unitsInStock = unitsInStock;
        this.brand = brand;
        this.dateCreated = dateCreated;
        this.lastUpdated = lastUpdated;
    }
    
    @Override
    public String toString() {
        return "Product{" +
               "id=" + id +
               ", name='" + name + '\'' +
               ", description='" + description + '\'' +
               ", unitPrice=" + unitPrice +
               ", imageUrl='" + imageUrl + '\'' +
               ", unitsInStock=" + unitsInStock +
               ", brand='" + brand + '\'' +
               ", dateCreated=" + dateCreated +
               ", lastUpdated=" + lastUpdated +
               '}';
    }
}
