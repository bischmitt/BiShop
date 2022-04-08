package soulCode.empresa.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import soulCode.empresa.models.Supervisor;

public interface SupervisorRepository extends JpaRepository<Supervisor, Integer> {
    @Query(value = "SELECT * FROM supervisor WHERE id_cargo = :id_cargo", nativeQuery = true)
    Supervisor buscarSupervisorDoCargo(Integer id_cargo);

    @Query(value = "SELECT * FROM supervisor WHERE id_cargo is null", nativeQuery = true)
    List<Supervisor> buscarSupervisorSemCargo();

    @Query(value = "SELECT supervisor.id_supervisor,supervisor.spvisor_nome,supervisor.spvisor_formacao, supervisor.spvisor_foto, supervisor.spvisor_cidade, cargo.id_cargo,cargo.car_nome,cargo.car_atribuicao FROM cargo right JOIN supervisor ON supervisor.id_cargo = cargo.id_cargo order by supervisor.spvisor_nome;", nativeQuery = true)
    List<List> supervisorComSeuCargo();

    @Query(value = "SELECT * FROM supervisor WHERE spvisor_nome = :spvisor_nome", nativeQuery = true)
	Supervisor fetchByName(String spvisor_nome);
}
