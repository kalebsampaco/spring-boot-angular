package net.guides.springboot2.api_spring.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import net.guides.springboot2.api_spring.model.Cargo;

@Repository
public interface CargoRepository extends JpaRepository<Cargo, Long>{

}
