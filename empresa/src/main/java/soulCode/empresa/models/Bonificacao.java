package soulCode.empresa.models;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.NumberFormat;

@Entity
public class Bonificacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer codigo;

    @Column(nullable = false)
    private String bo_descricao;

    @DateTimeFormat(pattern = "dd-MM-yyyy")
    //@Temporal(TemporalType.DATE)
    // Temporal é uma anotação que está relacionado a datas
    @Column(columnDefinition = "date", nullable = false)
    private Date bo_data_pagamento;

    @NumberFormat(pattern = "#.##0,00")
    @Column(nullable = false)
    private Double bo_valor;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatusBonificacao bo_status;

    @ManyToOne(cascade=CascadeType.ALL)
    @JoinColumn(name = "id_funcionario")
    private Funcionario funcionario;

    public Integer getCodigo() {
        return codigo;
    }

    public void setCodigo(Integer codigo) {
        this.codigo = codigo;
    }

    public String getBo_descricao() {
        return bo_descricao;
    }

    public void setBo_descricao(String bo_descricao) {
        this.bo_descricao = bo_descricao;
    }

    public Date getBo_data_pagamento() {
        return bo_data_pagamento;
    }

    public void setBo_data_pagamento(Date bo_data_pagamento) {
        this.bo_data_pagamento = bo_data_pagamento;
    }

    public Double getBo_valor() {
        return bo_valor;
    }

    public void setBo_valor(Double bo_valor) {
        this.bo_valor = bo_valor;
    }

    public StatusBonificacao getBo_status() {
        return bo_status;
    }

    public void setBo_status(StatusBonificacao bo_status) {
        this.bo_status = bo_status;
    }

    public Funcionario getFuncionario() {
        return funcionario;
    }

    public void setFuncionario(Funcionario funcionario) {
        this.funcionario = funcionario;
    }
}