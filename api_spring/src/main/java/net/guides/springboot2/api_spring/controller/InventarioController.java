package net.guides.springboot2.api_spring.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// import jakarta.validation.Valid;
import net.guides.springboot2.api_spring.exception.ResourceNotFoundException;
import net.guides.springboot2.api_spring.model.Inventario;
import net.guides.springboot2.api_spring.repository.InventarioRepository;

@CrossOrigin(origins = "http://localhost")
@RestController
@RequestMapping("/api/v1")
public class InventarioController {
	@Autowired
	private InventarioRepository inventarioRepository;

	@GetMapping("/inventario")
	public List<Inventario> getAllInventario() {
		return inventarioRepository.findAll();
	}

	@GetMapping("/inventario/{id}")
	public ResponseEntity<Inventario> getInventarioById(@PathVariable(value = "id") Long invId)
			throws ResourceNotFoundException {
		Inventario inventario = inventarioRepository.findById(invId)
				.orElseThrow(() -> new ResourceNotFoundException("Empleado no encontrado con ese id :: " + invId));
		return ResponseEntity.ok().body(inventario);
	}

	@PostMapping("/inventario")
	public Inventario createEmployee(@Validated @RequestBody Inventario inventario) {
		System.out.println(inventario);
		return inventarioRepository.save(inventario);
	}

	@PutMapping("/inventario/{id}")
	public ResponseEntity<Inventario> updateInventario(@PathVariable(value = "id") Long invId,
			@Validated @RequestBody Inventario invDetails) throws ResourceNotFoundException {
		Inventario inventario = inventarioRepository.findById(invId)
				.orElseThrow(() -> new ResourceNotFoundException("Inventario con encontrado con este id :: " + invId));
		inventario.setNombreProducto(invDetails.getNombreProducto());
		inventario.setCantidad(invDetails.getCantidad());
		inventario.setFechaIngreso(invDetails.getFechaIngreso());
		inventario.setUserRegister(invDetails.getUserRegister());
		inventario.setUserModified(invDetails.getUserModified());
		inventario.setFechaModified(invDetails.getFechaModified());
		final Inventario updatedInventario = inventarioRepository.save(inventario);
		return ResponseEntity.ok(updatedInventario);
	}

	@DeleteMapping("/inventario/{id}")
	public Map<String, Boolean> deleteinventario(@PathVariable(value = "id") Long invId)
			throws ResourceNotFoundException {
		Inventario inventario = inventarioRepository.findById(invId)
				.orElseThrow(() -> new ResourceNotFoundException("Employee not found for this id :: " + invId));

		inventarioRepository.delete(inventario);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return response;
	}
}
