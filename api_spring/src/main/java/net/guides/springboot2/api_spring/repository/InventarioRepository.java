package net.guides.springboot2.api_spring.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import net.guides.springboot2.api_spring.model.Inventario;

@Repository
public interface InventarioRepository extends JpaRepository<Inventario, Long>{

}
