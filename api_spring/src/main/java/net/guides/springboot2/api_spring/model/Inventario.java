package net.guides.springboot2.api_spring.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "inventario")
public class Inventario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre_producto", nullable = false)
    private String nombreProducto;

    @Column(name = "cantidad", nullable = false)
    private Integer cantidad;

    @Column(name = "fecha_ingreso", nullable = false)
    private String fechaIngreso;

    @Column(name = "user_register_id")
    private Integer userRegister;

    @Column(name = "user_modified_id")
    private Integer userModified;

    @Column(name = "fecha_modified", nullable = true)
    private String fechaModified;

    // Getters y Setters
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public String getNombreProducto() {
        return nombreProducto;
    }
    public void setNombreProducto(String nombreProducto) {
        this.nombreProducto = nombreProducto;
    }

    public Integer getCantidad() {
        return cantidad;
    }
    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }

    public String getFechaIngreso() {
        return fechaIngreso;
    }
    public void setFechaIngreso(String fechaIngreso) {
        this.fechaIngreso = fechaIngreso;
    }

    public Integer getUserRegister() {
        return userRegister;
    }
    public void setUserRegister(Integer userRegister) {
        this.userRegister = userRegister;
    }

    public Integer getUserModified() {
        return userModified;
    }
    public void setUserModified(Integer userModified) {
        this.userModified = userModified;
    }

    public String getFechaModified() {
        return fechaModified;
    }
    public void setFechaModified(String fechaModified) {
        this.fechaModified = fechaModified;
    }

    @Override
    public String toString() {
        return "Inventario [id=" + id + ", nombreProducto=" + nombreProducto + ", cantidad=" + cantidad + ", fechaIngreso=" + fechaIngreso
                + "userRegister=" + userRegister +"userModified=" + userModified + "fechaModified="+ fechaModified + "]";
    }

}
