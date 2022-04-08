package soulCode.empresa.models;

public enum StatusBonificacao {

    PENDENTE("Pendente"),
    RECEBIDO("Recebido"),
    CANCELADO("Cancelado");

    private String descricao;

    StatusBonificacao(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }
}