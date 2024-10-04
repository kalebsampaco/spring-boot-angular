package net.guides.springboot2.api_spring.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name = "employees")
public class Employee {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String firstName;
	private String lastName;

	@Column(name = "email_address", nullable = false) // Asegúrate de que esto coincide con la base de datos
	private String emailAddress; // Cambia el nombre aquí también para que sea consistente

	private String edad;
    private Integer cargo;
	private String fechaIngreso;

	public Employee() {
	}

	public Employee(String firstName, String lastName, String emailAddress, String edad, Integer cargo, String fechaIngreso) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.emailAddress = emailAddress; // Cambia esto también
		this.edad = edad;
		this.cargo = cargo;
		this.fechaIngreso = fechaIngreso;
	}

	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}

	@Column(name = "first_name", nullable = false)
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	@Column(name = "last_name", nullable = false)
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmailAddress() { // Cambia el getter y setter también
		return emailAddress;
	}

	public void setEmailAddress(String emailAddress) {
		this.emailAddress = emailAddress;
	}

	@Column(name = "edad", nullable = false)
	public String getEdad() {
		return edad;
	}
	public void setEdad(String edad) {
		this.edad = edad;
	}

    @Column(name = "cargo", nullable = false)
	public Integer getCargo() {
		return cargo;
	}
	public void setCargo(Integer cargo) {
		this.cargo = cargo;
	}

	@Column(name = "fecha_ingreso", nullable = false)
	public String getFechaIngreso() {
		return fechaIngreso;
	}
	public void setFechaIngreso(String fechaIngreso) {
		this.fechaIngreso = fechaIngreso;
	}

	@Override
	public String toString() {
		return "Employee [id=" + id + ", firstName=" + firstName + ", lastName=" + lastName + ", emailAddress=" + emailAddress
				+ "edad=" + edad +"cargo=" + cargo + "fechaIngreso="+ fechaIngreso + "]";
	}
}
