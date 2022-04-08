package soulCode.empresa.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import soulCode.empresa.models.Bonificacao;
import soulCode.empresa.models.Funcionario;
import soulCode.empresa.models.StatusBonificacao;
import soulCode.empresa.repositories.BonificacaoRepository;

@Service
public class BonificacaoService {

    @Autowired
    private BonificacaoRepository bonificacaoRepository;

    @Autowired
    private FuncionarioService funcionarioService;

    public List<Bonificacao> buscarTodasBonificacoes() {
        return bonificacaoRepository.findAll();
    }

    public Bonificacao buscarUmaBonificacao(Integer codigo) {
        Optional<Bonificacao> bonificacao = bonificacaoRepository.findById(codigo);
        return bonificacao.orElseThrow();
    }

    public List<Bonificacao> buscarBonificacoesDeUmFuncionario(Integer id_funcionario) {
        List<Bonificacao> bonificacao = bonificacaoRepository.buscarBonificacoesDeUmFuncionario(id_funcionario);
        return bonificacao;
    }

    public Bonificacao adicionarUmaBonificacao(Bonificacao bonificacao, Integer id_funcionario) {
        bonificacao.setCodigo(null);
        Funcionario funcionario = funcionarioService.buscarUmFuncionario(id_funcionario);
        bonificacao.setFuncionario(funcionario);
        return bonificacaoRepository.save(bonificacao);
    }

    public void deletarUmaBonificacao(Integer codigo) {
        bonificacaoRepository.deleteById(codigo);
    }

    public Bonificacao editarBonificacao(Bonificacao bonificacao, Integer id_funcionario) {
        buscarUmaBonificacao(bonificacao.getCodigo());
        Funcionario funcionario = funcionarioService.buscarUmFuncionario(id_funcionario);
        bonificacao.setFuncionario(funcionario);
        return bonificacaoRepository.save(bonificacao);
    }

    public Bonificacao quitarBonificacao(Integer codigo) {
        Bonificacao bonificacao = buscarUmaBonificacao(codigo);
        StatusBonificacao st1 = StatusBonificacao.RECEBIDO;
        bonificacao.setBo_status(st1);
        return bonificacaoRepository.save(bonificacao);
    }

    public Bonificacao cancelarBonificacao(Integer codigo) {
        Bonificacao bonificacao = buscarUmaBonificacao(codigo);
        StatusBonificacao st1 = StatusBonificacao.CANCELADO;
        bonificacao.setBo_status(st1);
        return bonificacaoRepository.save(bonificacao);
    }
}
