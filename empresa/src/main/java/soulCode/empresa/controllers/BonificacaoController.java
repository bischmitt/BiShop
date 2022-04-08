package soulCode.empresa.controllers;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import soulCode.empresa.models.Bonificacao;
import soulCode.empresa.services.BonificacaoService;

import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@CrossOrigin
@RestController
@RequestMapping("empresa")
public class BonificacaoController {

    @Autowired
    private BonificacaoService bonificacaoService;

    @GetMapping(value = "/funcionario/bonificacao")
    public List<Bonificacao> buscarTodasBonificacoes() {
        List<Bonificacao> bonificacao = bonificacaoService.buscarTodasBonificacoes();
        return bonificacao;
    }

    @GetMapping("/funcionario/bonificacao/{codigo}")
    public ResponseEntity<Bonificacao> buscarUmaBonificacao(@PathVariable Integer codigo) {
        Bonificacao bonificacao = bonificacaoService.buscarUmaBonificacao(codigo);
        return ResponseEntity.ok().body(bonificacao);
    }

    @GetMapping("/funcionario/bonificacoesDoFuncionario/{id_funcionario}")
    public List<Bonificacao> buscarBonificacoesDeUmFuncionario(@PathVariable Integer id_funcionario) {
        List<Bonificacao> bonificacao = bonificacaoService.buscarBonificacoesDeUmFuncionario(id_funcionario);
        return bonificacao;
    }

    @PostMapping("/funcionario/bonificacao/{id_funcionario}")
    public ResponseEntity<Bonificacao> adicionarUmaBonificacao(@RequestBody Bonificacao bonificacao,
            @PathVariable Integer id_funcionario) {
        bonificacao = bonificacaoService.adicionarUmaBonificacao(bonificacao, id_funcionario);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(bonificacao.getCodigo()).toUri();
        return ResponseEntity.created(uri).build();
    }

    @DeleteMapping("/funcionario/bonificacao/{codigo}")
    public ResponseEntity<Void> deletarUmaBonificacao(@PathVariable Integer codigo) {
        bonificacaoService.deletarUmaBonificacao(codigo);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/funcionario/bonificacao/{codigo}/{id_funcionario}")
    public ResponseEntity<Bonificacao> editarBonificacao(@PathVariable Integer codigo,
            @PathVariable Integer id_funcionario,
            @RequestBody Bonificacao bonificacao) {
        bonificacao.setCodigo(codigo);
        bonificacao = bonificacaoService.editarBonificacao(bonificacao, id_funcionario);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("funcionario/quitarBonificacao/{codigo}")
    public ResponseEntity<Bonificacao> quitarBonificacao(@PathVariable Integer codigo) {
        bonificacaoService.quitarBonificacao(codigo);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("funcionario/cancelarBonificacao/{codigo}")
    public ResponseEntity<Bonificacao> cancelarBonificacao(@PathVariable Integer codigo) {
        bonificacaoService.cancelarBonificacao(codigo);
        return ResponseEntity.noContent().build();
    }
}
