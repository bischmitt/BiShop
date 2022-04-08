package soulCode.empresa.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Supervisor {
    @Id
    // Chave primária
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    // Autoincremento
    private Integer id_supervisor;

    @Column(nullable = false, length = 50)
    private String spvisor_nome;

    @Column(nullable = false, length = 60)
    private String spvisor_formacao;

    @Column(nullable = false, length = 60)
    private String spvisor_cidade;

    @Column(nullable = true)
    private String spvisor_foto;

    @OneToOne
    @JsonIgnore
    @JoinColumn(name = "id_cargo", unique = true)
    // fk é um atributo para a chave estrangeira
    private Cargo cargo;

    // Geters and seters

    public Integer getId_supervisor() {
        return id_supervisor;
    }

    public void setId_supervisor(Integer id_supervisor) {
        this.id_supervisor = id_supervisor;
    }

    public String getSpvisor_nome() {
        return spvisor_nome;
    }

    public void setSpvisor_nome(String spvisor_nome) {
        this.spvisor_nome = spvisor_nome;
    }

    public String getSpvisor_formacao() {
        return spvisor_formacao;
    }

    public void setSpvisor_formacao(String spvisor_formacao) {
        this.spvisor_formacao = spvisor_formacao;
    }

    public String getSpvisor_cidade() {
        return spvisor_cidade;
    }

    public void setSpvisor_cidade(String spvisor_cidade) {
        this.spvisor_cidade = spvisor_cidade;
    }

    public String getSpvisor_foto() {
        return spvisor_foto;
    }

    public void setSpvisor_foto(String spvisor_foto) {
        this.spvisor_foto = spvisor_foto;
    }

    public Cargo getCargo() {
        return cargo;
    }

    public void setCargo(Cargo cargo) {
        this.cargo = cargo;
    }

}
