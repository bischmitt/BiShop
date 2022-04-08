/*entity ⇒ modelo de cada tabela

repository ⇒ interface, chama o Jparepository(tras metodo de crud prontos)

service ⇒ cria a rotina do crud, com os metodos JPA chamado no repository

controller ⇒ cria a rota , mapear o endpoint, qual rota o serviço deve ser chamado*/

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
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import soulCode.empresa.models.Cargo;
import soulCode.empresa.models.Funcionario;
import soulCode.empresa.services.FuncionarioService;

@CrossOrigin
// Resolve os problemas de Cors
@RestController
@RequestMapping("empresa")
public class FuncionarioController {

	// Precisamos da injeção de dependências

	// @Autowired
	// private FuncionarioRepository funcionarioRepository;

	@Autowired
	private FuncionarioService funcionarioService;

	// Criando o método que mostra todos os funcionários, que tem como retorno uma
	// lista do tipo funcionario. Funcionario é a tabela criado no banco de dados
	@GetMapping("/funcionario")
	public List<Funcionario> mostrarTodosFuncionarios() {
		// dentro do objeto funcionario vai estar o resultado
		List<Funcionario> funcionario = funcionarioService.findAll();
		return funcionario;
	}

	// Rota para a lista da tabela de funcionários com elementos da tabela de cargos
	@GetMapping("/funcionario-cargo")
	public List<List> funcionariosComCargo() {
		List<List> funcionarioCargo = funcionarioService.funcionariosComCargo();
		return funcionarioCargo;
	}

	// ResponseEntity retorna os dados reais de um registro do banco de dados;
	// Retorna uma resposta inteira, incluíndo cabeçalho, corpo e status;
	// @PathVariable - Especifica o id procurado vai ser passado atrvés da URL
	@GetMapping("/funcionario/{id_funcionario}")
	public ResponseEntity<?> buscarUmFuncionario(@PathVariable Integer id_funcionario) {
		Funcionario funcionario = funcionarioService.buscarUmFuncionario(id_funcionario);
		return ResponseEntity.ok().body(funcionario);
	}

	// Busca um funcionario de acordo com o cargo
	@GetMapping("/funcionario/busca-cargo/{id_cargo}")
	public List<Funcionario> buscarFuncionarioCargo(@PathVariable Integer id_cargo) {
		List<Funcionario> funcionario = funcionarioService.buscarFuncionarioCargo(id_cargo);
		return funcionario;
		// Aqui retorna-se o funcionário do cargo em questão
	}

	// Busca um funcionário de acordo com o nome
	@GetMapping("/funcionario-nome/{func_nome}")
    public ResponseEntity<Funcionario> buscarFuncionarioPeloNome(@PathVariable String func_nome) {
        Funcionario funcionario = funcionarioService.buscarFuncionarioPeloNome(func_nome);
        return ResponseEntity.ok().body(funcionario);
    }

	// @PostMapping("/funcionario")
	// public ResponseEntity<Void> InserirFuncionario(@RequestBody Funcionario
	// funcionario) {
	// funcionario = funcionarioService.InserirFuncionario(funcionario);
	// URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
	// .buildAndExpand(funcionario.getId_funcionario()).toUri();
	// return ResponseEntity.created(uri).build();
	// }

	// Mapeamento para inserir Funcionário
	/*
	 * @PostMapping("/funcionario")
	 * public ResponseEntity<Funcionario> inserirFuncionario(@RequestParam(value =
	 * "cargo") Integer id_cargo,
	 * 
	 * @RequestBody Funcionario funcionario) {
	 * funcionario = funcionarioService.inserirFuncionario(id_cargo, funcionario);
	 * URI uri =
	 * ServletUriComponentsBuilder.fromCurrentRequest().path("/funcionario/{id}")
	 * .buildAndExpand(funcionario.getId_funcionario()).toUri();
	 * return ResponseEntity.created(uri).build();
	 * }
	 */

	@PostMapping("/funcionario")
	public ResponseEntity<Funcionario> inserirFuncionario(@RequestBody Funcionario funcionario) {
		funcionario = funcionarioService.inserirFuncionario(funcionario);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(funcionario.getId_funcionario()).toUri();
		return ResponseEntity.created(uri).build();
	}

	@DeleteMapping("/funcionario/{id_funcionario}")
	public ResponseEntity<Void> deletarUmFuncionario(@PathVariable Integer id_funcionario) {
		funcionarioService.deletarUmFuncionario(id_funcionario);
		return ResponseEntity.noContent().build();
	}

	// @PutMapping("/funcionario/{id_funcionario}")
	// public ResponseEntity<Void> editarFuncionario(@PathVariable Integer
	// id_funcionario,
	// @RequestBody Funcionario funcionario) {
	// funcionario.setId_funcionario(id_funcionario);
	// funcionario = funcionarioService.editarFuncionario(funcionario);
	// return ResponseEntity.noContent().build();
	// }

	// Mapeamento para editar Funcionario
	@PutMapping("/funcionario/{id_funcionario}")
	public ResponseEntity<Void> editarFuncionario(@PathVariable Integer id_funcionario,
			@RequestBody Funcionario funcionario) {
		funcionario.setId_funcionario(id_funcionario);
		funcionario = funcionarioService.editarFuncionario(funcionario);
		return ResponseEntity.noContent().build();
	}

	@PutMapping("/funcionario/inserirCargo/{id_funcionario}")
	public ResponseEntity<Funcionario> inserirFuncionarioNoCargo(@PathVariable Integer id_funcionario,
			@RequestBody Cargo cargo) {
		Funcionario funcionario = funcionarioService.inserirFuncionarioNoCargo(id_funcionario, cargo);
		return ResponseEntity.noContent().build();
	}

	@PutMapping("/funcionario/deixarSemCargo/{id_funcionario}")
	public ResponseEntity<Funcionario> deixarFuncionarioSemCargo(@PathVariable Integer id_funcionario) {
		Funcionario funcionario = funcionarioService.deixarFuncionarioSemCargo(id_funcionario);
		return ResponseEntity.noContent().build();
	}
}
