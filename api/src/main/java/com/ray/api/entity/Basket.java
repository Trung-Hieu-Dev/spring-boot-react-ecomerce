package com.ray.api.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "basket")
public class Basket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "buyer_id")
    private String buyerId;
    
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "basket")
    private Set<BasketItem> basketItems;
    
    public void addItem(Product product, int quantity) {
        if (product != null) {
            if (basketItems == null) {
                 basketItems = new HashSet<>();
            }
            
            BasketItem existingItem = basketItems.stream()
                                                 .filter(item -> item.getProduct().equals(product))
                                                 .findAny().orElse(null);
            
            if (existingItem != null) {
                int newQuantity = existingItem.getQuantity() + quantity;
                existingItem.setQuantity(newQuantity);
            } else {
                basketItems.add(new BasketItem(quantity, this, product));
            }
        }
    }
    
    public Basket() {
    }
    
    public Basket(String buyerId) {
        this.buyerId = buyerId;
    }
    
    @Override public String toString() {
        return "Basket{" + "id=" + id + ", buyerId='" + buyerId + '\'' + ", basketItems=" + basketItems + '}';
    }
}
