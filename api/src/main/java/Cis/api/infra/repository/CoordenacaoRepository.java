package Cis.api.infra.repository;

import Cis.api.domain.entity.Coordenacao;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CoordenacaoRepository extends JpaRepository<Coordenacao, Long> {

    @Override
    Optional<Coordenacao> findById(Long aLong);

    Optional<Coordenacao> findByNome(String nome);

    boolean existsByNome(String nome);
}
