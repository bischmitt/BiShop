package soulCode.empresa.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import soulCode.empresa.models.Bonificacao;

public interface BonificacaoRepository extends JpaRepository<Bonificacao, Integer> {
    @Query(value = "SELECT * FROM bd_empresa.bonificacao WHERE id_funcionario= :id_funcionario", nativeQuery = true)
    List<Bonificacao> buscarBonificacoesDeUmFuncionario(Integer id_funcionario);
}