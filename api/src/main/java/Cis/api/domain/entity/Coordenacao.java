package Cis.api.domain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "coordenacao")
@Getter
@NoArgsConstructor
public class Coordenacao {

    public Coordenacao(String nome, String email, String telefone) {
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false, unique = true)
    private String email;
    private String telefone;

    @Setter
    private boolean ativo;

    @OneToMany(mappedBy = "coordenacao", fetch = FetchType.LAZY)
    private List<Psicologo> psicologos; // Nome do campo na entidade Psicologo

    // Lado 2: Relacionamento com Paciente (Coordenacao gerencia MUITOS Pacientes)
    //@OneToMany(mappedBy = "coordenacao", fetch = FetchType.LAZY)
    //private List<Paciente> pacientes; // Nome do campo na entidade Paciente


    public void atualizarDados(String nome, String email, String telefone) {
        if (nome != null && !nome.isBlank()) {
            this.nome = nome;
        }
        if (email != null && !email.isBlank()) {
            this.email = email;
        }
        if (telefone != null && !telefone.isBlank()) {
            this.telefone = telefone;
        }
    }


}
