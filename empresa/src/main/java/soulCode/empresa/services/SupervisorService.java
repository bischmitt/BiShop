package soulCode.empresa.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import soulCode.empresa.models.Cargo;
import soulCode.empresa.models.Supervisor;
import soulCode.empresa.repositories.CargoRepository;
import soulCode.empresa.repositories.SupervisorRepository;

@Service
public class SupervisorService {

    @Autowired
    private SupervisorRepository supervisorRepository;
    // Inserindo injeção de dependência

    @Autowired
    private CargoRepository cargoRepository;

    @Autowired
    private CargoService cargoService;

    // Serviço que mostra todos os supervisores
    public List<Supervisor> mostrarTodosSupervisores() {
        return supervisorRepository.findAll();
    }

    // Serviço que mostra um supervisor
    public Supervisor mostrarUmSupervisor(Integer id_supervisor) {
        Optional<Supervisor> supervisor = supervisorRepository.findById(id_supervisor);
        return supervisor.orElseThrow();
    }

    // Serviço que busca o supervisor de um cargo específico
    public Supervisor buscarSupervisorDoCargo(Integer id_cargo) {
        Supervisor supervisor = supervisorRepository.buscarSupervisorDoCargo(id_cargo);
        return supervisor;
    }

    public Supervisor buscarSupervisorPeloNome(String spvisor_nome) {
        Supervisor supervisor = supervisorRepository.fetchByName(spvisor_nome);
        return supervisor;
    }

    // Supervisor sem cargo
    public List<Supervisor> supervisorSemCargo() {
        return supervisorRepository.buscarSupervisorSemCargo();
    }

    // Supervisor com seu cargo
    public List<List> SupervisorComSeuCargo() {
        return supervisorRepository.supervisorComSeuCargo();
    }

    // Serviço que insere um supervisor
    public Supervisor inserirSupervisor(Integer id_cargo, Supervisor supervisor) {
        // Aqui puxa o id do cargo
        supervisor.setId_supervisor(null);
        if (id_cargo != null) {
            Cargo cargo = cargoService.buscarUmCargo(id_cargo);
            supervisor.setCargo(cargo);
            /* cargo.setSupervisor(supervisor); */
        }
        return supervisorRepository.save(supervisor);
    }

    // Serviço para editar supervisor
    /*
     * public Supervisor editarSupervisor(Integer id_cargo, Supervisor supervisor) {
     * // esse id_cargo é o id do próximo cargo que ele será inserido
     * 
     * if (id_cargo != null) {
     * Supervisor supervisorAntesMudanca =
     * mostrarUmSupervisor(supervisor.getId_supervisor());
     * Cargo cargoAnterior = supervisorAntesMudanca.getCargo();
     * if (cargoAnterior != null) {
     * cargoAnterior.setSupervisor(null);
     * cargoRepository.save(cargoAnterior);
     * }
     * 
     * Cargo cargo = cargoService.buscarUmCargo(id_cargo);
     * // busca um novo cargo
     * supervisor.setCargo(cargo);
     * // seta o supervisor no cargo novo
     * cargo.setSupervisor(supervisor);
     * // seta o cargo no supervisor novo
     * }
     * return supervisorRepository.save(supervisor);
     * }
     */

    // Serviço para editar supervisor
    public Supervisor editarSupervisor(Supervisor supervisor) {
        mostrarUmSupervisor(supervisor.getId_supervisor());
        Integer id_cargo = cargoRepository.mostrarIdCargoSupervisor(supervisor.getId_supervisor());
        if (id_cargo != null) {
            Cargo cargo = cargoService.buscarUmCargo(id_cargo);
            supervisor.setCargo(cargo);
        }
        return supervisorRepository.save(supervisor);
    }

    // Deleta um funcionário
    public void deletarUmSupervisor(Integer id_supervisor) {
        supervisorRepository.deleteById(id_supervisor);
    }

    public Supervisor salvarFoto(Integer id_supervisor, String caminhoFoto) {
        Supervisor supervisor = mostrarUmSupervisor(id_supervisor);
        supervisor.setSpvisor_foto(caminhoFoto);
        return supervisorRepository.save(supervisor);
    }
}
