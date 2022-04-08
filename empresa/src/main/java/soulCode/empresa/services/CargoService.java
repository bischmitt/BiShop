package soulCode.empresa.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import soulCode.empresa.models.Cargo;
import soulCode.empresa.models.Supervisor;
import soulCode.empresa.repositories.CargoRepository;
import soulCode.empresa.services.exception.ObjectNotFoundException;

@Service
public class CargoService {

	@Autowired
	private CargoRepository cargoRepository;

	@Lazy
	@Autowired
	private SupervisorService supervisorService;

	// Mostrar um cargo
	public List<Cargo> mostrarTodosCargos() {
		return cargoRepository.findAll();
	}

	// Buscar um cargo
	public Cargo buscarUmCargo(Integer id_cargo) {
		Optional<Cargo> cargo = cargoRepository.findById(id_cargo);
		// Lançamento de exceção. Tratamento de erro para ooperações críticas, passíveis
		// de erro.
		// Se der erro, lança a exceção, a mensagem, que foi criada dentro da classe
		// ObjectNotFoundException é enviada.
		return cargo.orElseThrow(() -> new ObjectNotFoundException(
				"Objeto não cadastrado no banco de dados! O id procurado foi: " + id_cargo));
	}

	// Cargo sem supervisor
	public List<Cargo> cargoSemSupervisor() {
		return cargoRepository.cargoSemSupervisor();
	}

	// Cargo do supervisor
	public Cargo cargoDoSupervisor(Integer id_supervisor) {
		Cargo cargo = cargoRepository.cargoDoSupervisor(id_supervisor);
		return cargo;
	}

	// Cargo com seu supervisor
	public List<List> cargoComSeuSupervisor() {
		return cargoRepository.cargoComSeuSupervisor();
	}

	/*
	 * // Cadastrar um cargo
	 * public Cargo cadastrarCargo(Cargo cargo) {
	 * // é uma forma de segurança para não setarmos o id;
	 * cargo.setId_cargo(null);
	 * return cargoRepository.save(cargo);
	 * }
	 */

	// Cadastrar um cargo
	public Cargo cadastrarCargo(Integer id_supervisor, Cargo cargo) {
		// é uma forma de segurança para não setarmos o id
		cargo.setId_cargo(null);
		if (id_supervisor != null) {
			Supervisor supervisor = supervisorService.mostrarUmSupervisor(id_supervisor);
			cargo.setSupervisor(supervisor);
		}
		return cargoRepository.save(cargo);
	}

	// Editar cargo
	public Cargo editarCargo(Cargo cargo) {
		buscarUmCargo(cargo.getId_cargo());
		return cargoRepository.save(cargo);
	}

	// Deletar um cargo
	public void deletarUmCargo(Integer id_cargo) {
		buscarUmCargo(id_cargo);
		try {
			cargoRepository.deleteById(id_cargo);
		} catch (org.springframework.dao.DataIntegrityViolationException e) {
			// O catch vem diretamente do Spring
			throw new soulCode.empresa.services.exception.DataIntegrityViolationException
			// Aqui no throw será inserido o tratamento de erro personalizado
			("O cargo não pode ser deletado, pois possui funcionários relacionados");
		}
	}

	/*
	 * // Atribuir um supervisor a um cargo
	 * public Cargo atribuirSupervisor(Integer id_cargo, Integer id_supervisor) {
	 * Cargo cargo = buscarUmCargo(id_cargo);
	 * Supervisor supervisor = supervisorService.mostrarUmSupervisor(id_supervisor);
	 * cargo.setSupervisor(supervisor);
	 * supervisor.setCargo(cargo);
	 * return cargoRepository.save(cargo);
	 * }
	 */

	// Atribuir um supervisor a um cargo
	public Cargo atribuirSupervisor(Integer id_cargo, Integer id_supervisor) {
		Cargo cargo = buscarUmCargo(id_cargo);
		Supervisor supervisorAnterior = supervisorService.buscarSupervisorDoCargo(id_cargo);
		Supervisor supervisor = supervisorService.mostrarUmSupervisor(id_supervisor);
		if (cargo.getSupervisor() != null) {
			cargo.setSupervisor(null);
			supervisorAnterior.setCargo(null);
		}
		cargo.setSupervisor(supervisor);
		supervisor.setCargo(cargo);
		return cargoRepository.save(cargo);
	}

	// Deixar um cargo sem supervisor
	public Cargo deixarCargoSemSupervisor(Integer id_cargo, Integer id_supervisor) {
		Cargo cargo = buscarUmCargo(id_cargo);
		cargo.setSupervisor(null);
		Supervisor supervisor = supervisorService.mostrarUmSupervisor(id_supervisor);
		supervisor.setCargo(null);
		return cargoRepository.save(cargo);
	}
}
