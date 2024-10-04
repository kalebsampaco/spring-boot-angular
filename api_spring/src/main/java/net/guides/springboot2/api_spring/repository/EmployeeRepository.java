package net.guides.springboot2.api_spring.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import net.guides.springboot2.api_spring.model.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long>{

}
