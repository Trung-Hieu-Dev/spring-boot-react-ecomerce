package com.ray.api.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Setter
@Getter
@Entity(name = "basket_item")
@Table(name = "basket_item")
public class BasketItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private int quantity;
    
    @ManyToOne
    @JoinColumn(name = "basket_id")
    @JsonIgnore
    private Basket basket;
    
    @OneToOne(cascade = {CascadeType.DETACH, CascadeType.MERGE,
                         CascadeType.PERSIST, CascadeType.REFRESH})
    @JoinColumn(name = "product_id", referencedColumnName = "id")
    private Product product;
    
    public BasketItem() {
    }
    
    public BasketItem(int quantity, Basket basket, Product product) {
        this.quantity = quantity;
        this.basket = basket;
        this.product = product;
    }
    
    @Override public String toString() {
        return "BasketItem{" + "id=" + id + ", quantity=" + quantity + ", basket=" + basket + ", product=" + product +
               '}';
    }
}
