package soulCode.empresa.controllers;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import soulCode.empresa.models.Cargo;
import soulCode.empresa.models.Supervisor;
import soulCode.empresa.services.CargoService;

@CrossOrigin
@RestController
@RequestMapping("empresa")
public class CargoController {

	@Autowired
	private CargoService cargoService;

	// Mapeamento para mostrar todos os cargos
	@GetMapping("/cargo")
	public List<Cargo> mostrarTodosCargos() {
		List<Cargo> cargo = cargoService.mostrarTodosCargos();
		return cargo;
	}

	// Mapeamento para buscar um cargo
	@GetMapping("/cargo/{id_cargo}")
	public ResponseEntity<Cargo> buscarUmCargo(@PathVariable Integer id_cargo) {
		Cargo cargo = cargoService.buscarUmCargo(id_cargo);
		return ResponseEntity.ok().body(cargo);
	}

	@GetMapping("/cargoSemSupervisor")
	public List<Cargo> supervisorSemCargo() {
		List<Cargo> cargo = cargoService.cargoSemSupervisor();
		return cargo;
	}

	@GetMapping("/cargo/cargo-supervisor/{id_supervisor}")
	public Cargo cargoDoSupervisor(@PathVariable Integer id_supervisor) {
		return cargoService.cargoDoSupervisor(id_supervisor);
	}

	@GetMapping("/cargo/cargo-supervisor")
	public List<List> cargosComSupervisor() {
		List<List> cargoSupervisor = cargoService.cargoComSeuSupervisor();
		return cargoSupervisor;
	}

	/*
	 * // Mapeamento para cadastrar um cargo
	 * 
	 * @PostMapping("/cargo")
	 * public ResponseEntity<Void> cadastrarCargo(@RequestBody Cargo cargo) {
	 * cargo = cargoService.cadastrarCargo(cargo);
	 * URI uri =
	 * ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand
	 * (cargo.getId_cargo())
	 * .toUri();
	 * return ResponseEntity.created(uri).build();
	 * }
	 */

	// Mapeamento para cadastrar um cargo
	@PostMapping("/cargo")
	public ResponseEntity<Cargo> cadastrarCargo(
			@RequestParam(value = "supervisor", required = false) Integer id_supervisor, @RequestBody Cargo cargo) {
		cargo = cargoService.cadastrarCargo(id_supervisor, cargo);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(cargo.getId_cargo()).toUri();
		return ResponseEntity.created(uri).build();
	}

	// Mapeamento para editar um cargo
	@PutMapping("/cargo/{id_cargo}")
	public ResponseEntity<Cargo> editarCargo(@PathVariable Integer id_cargo, @RequestBody Cargo cargo) {
		cargo.setId_cargo(id_cargo);
		cargo = cargoService.editarCargo(cargo);
		return ResponseEntity.noContent().build();
	}

	// Mapeamento para atribuir um supervisor
	@PutMapping("/cargo/definirSupervisor/{id_cargo}/{id_supervisor}")
	public ResponseEntity<Supervisor> atribuirSupervisor(@PathVariable Integer id_cargo,
			@PathVariable Integer id_supervisor) {
		cargoService.atribuirSupervisor(id_cargo, id_supervisor);
		return ResponseEntity.noContent().build();
	}

	// Mapeamento para tirar um supervisor da supervisão de um cargo
	@PutMapping("/cargo/tirarSupervisor/{id_cargo}/{id_supervisor}")
	public ResponseEntity<Supervisor> deixarCargoSemSupervisor(@PathVariable Integer id_cargo,
			@PathVariable Integer id_supervisor) {
		cargoService.deixarCargoSemSupervisor(id_cargo, id_supervisor);
		return ResponseEntity.noContent().build();
	}

	// Mapeamento para deletar um cargo
	@DeleteMapping("/cargo/{id_cargo}")
	public ResponseEntity<Void> deletarUmCargo(@PathVariable Integer id_cargo) {
		cargoService.deletarUmCargo(id_cargo);
		return ResponseEntity.noContent().build();
	}
}
