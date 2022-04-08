package soulCode.empresa.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import soulCode.empresa.models.Funcionario;

public interface FuncionarioRepository extends JpaRepository<Funcionario, Integer> {
	// Funcionario é o model e Integer é o tipo da chave primária

	@Query(value = "SELECT * FROM funcionario WHERE id_cargo = :id_cargo", nativeQuery = true)
	// Esse comando serve para fazer uma consulta personalizada no banco do MySQL

	// @Query(value = "SELECT id_cargo FROM funcionario WHERE id_funcionario =
	// :id_funcionrio", nativeQuery = true)
	// uma forma de contornar o problema dele estar censurando o id da turma no
	// aluno é fazer uma rota
	// especificamente pra retornar o id da turma vinculada àquele ra_aluno.
	// daí ele retorna só o id da turma daquele aluno

	List<Funcionario> fetchByCargo(Integer id_cargo);

	@Query(value = "SELECT id_funcionario, func_nome, func_cidade, func_foto, cargo.id_cargo, car_nome, car_atribuicao FROM cargo right JOIN funcionario ON funcionario.id_cargo = cargo.id_cargo order by func_nome", nativeQuery = true)
	List<List> funcionariosComCargo();

	@Query(value = "SELECT * FROM funcionario WHERE func_nome = :func_nome", nativeQuery = true)
	Funcionario fetchByName(String func_nome);

	@Query(value = "SELECT id_cargo FROM funcionario WHERE id_funcionario = :id_funcionario", nativeQuery = true)
	Integer buscarIdCargoFuncionario(Integer id_funcionario);
}
