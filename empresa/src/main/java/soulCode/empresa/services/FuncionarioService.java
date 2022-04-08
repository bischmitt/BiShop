package soulCode.empresa.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import soulCode.empresa.models.Cargo;
import soulCode.empresa.models.Funcionario;
import soulCode.empresa.repositories.FuncionarioRepository;

@Service
public class FuncionarioService {

	// Fazendo injeção de dependência
	@Autowired
	private FuncionarioRepository funcionarioRepository;

	@Autowired
	private CargoService cargoService;

	// O primeiro serviço que vamos implementar é a listagem de todos os
	// funcionários cadastrados
	public List<Funcionario> findAll() {
		return funcionarioRepository.findAll();
	}

	// Retorna uma lista com elementos da tabela de funcionarios e de cargos
	public List<List> funcionariosComCargo() {
		return funcionarioRepository.funcionariosComCargo();
	}

	// Busca um funcionário
	public Funcionario buscarUmFuncionario(Integer id_funcionario) {
		// Optional - nos ajuda a evitar os erros NullPointerExcetion;
		// Tira a necessidade da verificação de criarmos a codificação (if funcionario
		// !=null)
		Optional<Funcionario> funcionario = funcionarioRepository.findById(id_funcionario);
		return funcionario.orElseThrow();
		// orElseThrow() - Se o funcionario estiver presente no banco de dados, retorna
		// o funcionario, senão lança uma exceção;
	}

	// Busca um funcionário pelo nome
	public Funcionario buscarFuncionarioPeloNome(String func_nome) {
		Funcionario funcionario = funcionarioRepository.fetchByName(func_nome);
		return funcionario;
	}

	/*
	 * // Insere um funcionário no cargo
	 * public Funcionario inserirFuncionario(Integer id_cargo, Funcionario
	 * funcionario) {
	 * funcionario.setId_funcionario(null);
	 * Cargo cargo = cargoService.buscarUmCargo(id_cargo);
	 * funcionario.setCargo(cargo);
	 * return funcionarioRepository.save(funcionario);
	 * }
	 */

	// Insere um funcionário no cargo
	public Funcionario inserirFuncionario(Funcionario funcionario) {
		funcionario.setId_funcionario(null);
		return funcionarioRepository.save(funcionario);
	}

	// Deleta um funcionário
	public void deletarUmFuncionario(Integer id_funcionario) {
		funcionarioRepository.deleteById(id_funcionario);
	}

	// Edita funcionario
	public Funcionario editarFuncionario(Funcionario funcionario) {
		buscarUmFuncionario(funcionario.getId_funcionario());
		Integer id_cargo = funcionarioRepository.buscarIdCargoFuncionario(funcionario.getId_funcionario());
		if (id_cargo != null) {
			Cargo cargo = cargoService.buscarUmCargo(id_cargo);
			funcionario.setCargo(cargo);
		}
		return funcionarioRepository.save(funcionario);
	}

	// Busca funcionarios de um cargo em específico
	public List<Funcionario> buscarFuncionarioCargo(Integer id_cargo) {
		List<Funcionario> funcionario = funcionarioRepository.fetchByCargo(id_cargo);
		return funcionario;
	}

	public Funcionario inserirFuncionarioNoCargo(Integer id_funcionario, Cargo cargo) {
		Funcionario funcionario = buscarUmFuncionario(id_funcionario);
		funcionario.setCargo(cargo);
		return funcionarioRepository.save(funcionario);
	}

	public Funcionario deixarFuncionarioSemCargo(Integer id_funcionario) {
		Funcionario funcionario = buscarUmFuncionario(id_funcionario);
		funcionario.setCargo(null);
		return funcionarioRepository.save(funcionario);
	}

	public Funcionario salvarFoto(Integer id_funcionario, String caminhoFoto) {
		Funcionario funcionario = buscarUmFuncionario(id_funcionario);
		funcionario.setFunc_foto(caminhoFoto);
		return funcionarioRepository.save(funcionario);
	}
}
