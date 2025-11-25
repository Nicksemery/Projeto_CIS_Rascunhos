package Cis.api.controllers;

import Cis.api.domain.dtos.request.psicologo.PsicologoDtoRequest;
import Cis.api.domain.dtos.request.psicologo.PsicologoDtoUpdateRequest;
import Cis.api.domain.dtos.response.PsicologoDtoRespons;
import Cis.api.infra.service.PsicologoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/psicologo")
public class PsicologoController {

    private final PsicologoService service;

    public PsicologoController(PsicologoService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<PsicologoDtoRespons> cadastrarPsicologo(@RequestBody PsicologoDtoRequest dto, UriComponentsBuilder uriBuilder) {
        PsicologoDtoRespons resp = service.cadastrarPsicologo(dto);

        URI uri = uriBuilder.path("/psicologo/{id}").buildAndExpand(resp.id()).toUri();
        return ResponseEntity.created(uri).body(resp);
    }

    @PutMapping("{id}")
    public ResponseEntity<PsicologoDtoRespons> atualizarPsicologo(@RequestParam @PathVariable Long id, @RequestBody PsicologoDtoUpdateRequest dto) {
        var atualizacao = service.atualizarPsicologo(id,dto);
        return ResponseEntity.ok(atualizacao);
    }

    @GetMapping("{id}")
    public ResponseEntity<PsicologoDtoRespons> listarPsicologoPorId(@PathVariable Long id) {
        var psi = service.buscarPsicologoPorId(id);
        return ResponseEntity.ok(psi);
    }

    @GetMapping
    public ResponseEntity<List<PsicologoDtoRespons>> listarPsicologos(){
        var lista = service.listarPsicologos();
        return ResponseEntity.ok(lista);
    }

    @GetMapping("{nome}")
    public ResponseEntity<PsicologoDtoRespons> buscarPsicologoPorNome(@PathVariable String nome) {
        var psi = service.buscarPsicologoPorNome(nome);
        return ResponseEntity.ok(psi);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<PsicologoDtoRespons> deletarPsicologoPorId(@PathVariable Long id){
        service.deletarPsicologoPorId(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("{nome}")
    public ResponseEntity<PsicologoDtoRespons> deletarPsicologoPorNome(@PathVariable String nome){
        service.deletarPsicologoPorNome(nome);
        return ResponseEntity.noContent().build();
    }
}
