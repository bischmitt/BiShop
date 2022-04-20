package soulCode.empresa.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import soulCode.empresa.models.Funcionario;
import soulCode.empresa.models.Supervisor;
import soulCode.empresa.services.FuncionarioService;
import soulCode.empresa.services.SupervisorService;
import soulCode.empresa.utils.UploadFileUtil;

@RestController
@RequestMapping("empresa")
@CrossOrigin
public class UploadFileController {

    @Autowired
    SupervisorService supervisorService;

    @Autowired
    FuncionarioService funcionarioService;

    @PostMapping("/envio/{id_supervisor}")
    public ResponseEntity<String> enviarDados(@PathVariable Integer id_supervisor, MultipartFile foto,
            @RequestParam(value = "nome", required = false) String nome) {

        String fileName = nome;

        String uploadDir = "/home/bianca/Documentos/SoulCode/Projetos/BiShop/empresaFront/src/assets/img/supervisor";
        
        /* String nomeMaisCaminho = "c:" + uploadDir + "/" + nome; */

        String nomeMaisCaminho = "assets/img/supervisor/" + nome;

        Supervisor supervisor = supervisorService.salvarFoto(id_supervisor, nomeMaisCaminho);

        try {
            UploadFileUtil.salvarArquivo(uploadDir, fileName, foto);

        } catch (Exception e) {
            System.out.println("O arquivo não foi enviado" + e);
        }

        System.out.println("Deu certo: " + nomeMaisCaminho);
        return ResponseEntity.ok("Arquivo enviado");
    }

    @PostMapping("/envio/foto/funcionario/{id_funcionario}")
    public ResponseEntity<String> enviarDadosFuncionario(@PathVariable Integer id_funcionario, MultipartFile foto,
            @RequestParam(value = "nome", required = false) String nome) {

        String fileName = nome;

        String uploadDir = "/home/bianca/Documentos/SoulCode/Projetos/BiShop/empresaFront/src/assets/img/funcionario";

        /* String nomeMaisCaminho = "c:" + uploadDir + "/" + nome; */

        String nomeMaisCaminho = "assets/img/funcionario/" + nome;

        Funcionario funcionario = funcionarioService.salvarFoto(id_funcionario, nomeMaisCaminho);

        try {
            UploadFileUtil.salvarArquivo(uploadDir, fileName, foto);

        } catch (Exception e) {
            System.out.println("O arquivo não foi enviado" + e);
        }

        System.out.println("Deu certo: " + nomeMaisCaminho);
        return ResponseEntity.ok("Arquivo enviado");
    }
}
