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

import soulCode.empresa.models.Supervisor;
import soulCode.empresa.services.SupervisorService;

@CrossOrigin
@RestController
@RequestMapping("empresa")
public class SupervisorController {

    @Autowired
    private SupervisorService supervisorService;

    // Mostra supervisores
    @GetMapping("/supervisor")
    public List<Supervisor> mostrarTodosSupervisores() {
        List<Supervisor> supervisor = supervisorService.mostrarTodosSupervisores();
        return supervisor;
    }

    // Mostra um supervisor
    @GetMapping("/supervisor/{id_supervisor}")
    public ResponseEntity<Supervisor> mostrarUmSupervisor(@PathVariable Integer id_supervisor) {
        Supervisor supervisor = supervisorService.mostrarUmSupervisor(id_supervisor);
        return ResponseEntity.ok().body(supervisor);
    }

    // Busca supervisor do cargo
    @GetMapping("/supervisor-cargo/{id_cargo}")
    public ResponseEntity<Supervisor> buscarSupervisorDoCargo(@PathVariable Integer id_cargo) {
        Supervisor supervisor = supervisorService.buscarSupervisorDoCargo(id_cargo);
        return ResponseEntity.ok().body(supervisor);
    }

    @GetMapping("/supervisor-nome/{spvisor_nome}")
    public ResponseEntity<Supervisor> buscarSupervisorPeloNome(@PathVariable String spvisor_nome) {
        Supervisor supervisor = supervisorService.buscarSupervisorPeloNome(spvisor_nome);
        return ResponseEntity.ok().body(supervisor);
    }

    // Lista supervisores sem cargo
    @GetMapping("/supervisorSemCargo")
    public List<Supervisor> supervisorSemCargo() {
        List<Supervisor> supervisor = supervisorService.supervisorSemCargo();
        return supervisor;
    }

    // Lista Supervisors com cargo e supervisor com seu cargo
    @GetMapping("/supervisor/supervisor-cargo")
    public List<List> supervisorsComCargo() {
        List<List> supervisorCargo = supervisorService.SupervisorComSeuCargo();
        return supervisorCargo;
    }

    // Insere um supervisor
    @PostMapping("/supervisor")
    public ResponseEntity<Supervisor> inserirSupervisor(
            @RequestParam(value = "cargo", required = false) Integer id_cargo,
            @RequestBody Supervisor supervisor) {
        // required false serve para que a inserção do cargo não seja obrigatório
        // RequestBody passa o parâmetro do supervisor que quero cadastrar
        // supervisor é uma instância de Supervisor
        supervisor = supervisorService.inserirSupervisor(id_cargo, supervisor);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(supervisor.getId_supervisor()).toUri();
        return ResponseEntity.created(uri).build();
    }

    // Edita um supervisor
    // @PutMapping("/supervisor/{id_supervisor}")
    // public ResponseEntity<Supervisor> editarSupervisor(@RequestParam(value = "cargo") Cargo cargo,
    //         @PathVariable Integer id_supervisor, @RequestBody Supervisor supervisor) {
    //     supervisor.setId_supervisor(id_supervisor);
    //     supervisor.setCargo(cargo);
    //     cargo.setSupervisor(supervisor);
    //     supervisor = supervisorService.editarSupervisor(supervisor);
    //     return ResponseEntity.noContent().build();
    // }

    // Edita um supervisor
    @PutMapping("/supervisor/{id_supervisor}")
    public ResponseEntity<Supervisor> editarSupervisor(
            @PathVariable Integer id_supervisor, @RequestBody Supervisor supervisor) {
        supervisor.setId_supervisor(id_supervisor);
        supervisor = supervisorService.editarSupervisor(supervisor);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/supervisor/{id_supervisor}")
    public ResponseEntity<Void> deletarUmSupervisor(@PathVariable Integer id_supervisor) {
        supervisorService.deletarUmSupervisor(id_supervisor);
        return ResponseEntity.noContent().build();
    }
}
