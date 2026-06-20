package com.caballeriza.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.caballeriza.dto.CaballoRequest;
import com.caballeriza.dto.HistorialMedicoRequest;
import com.caballeriza.model.Caballo;
import com.caballeriza.model.HistorialMedico;
import com.caballeriza.service.CaballoService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/caballos")
@RequiredArgsConstructor
public class CaballoController {

    private final CaballoService caballoService;

    @GetMapping
    public ResponseEntity<List<Caballo>> listarTodos() {
        return ResponseEntity.ok(caballoService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Caballo> obtenerPorId(@PathVariable Long id) {
        return ResponseEntity.ok(caballoService.obtenerPorId(id));
    }

    @PostMapping
    public ResponseEntity<Caballo> crear(@Valid @RequestBody CaballoRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(caballoService.crear(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Caballo> actualizar(@PathVariable Long id,
                                               @Valid @RequestBody CaballoRequest request) {
        return ResponseEntity.ok(caballoService.actualizar(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        caballoService.eliminar(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/historial")
    public ResponseEntity<List<HistorialMedico>> obtenerHistorial(@PathVariable Long id) {
        return ResponseEntity.ok(caballoService.obtenerHistorial(id));
    }

    @PostMapping("/{id}/historial")
    public ResponseEntity<HistorialMedico> agregarHistorial(@PathVariable Long id,
                                                             @Valid @RequestBody HistorialMedicoRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(caballoService.agregarHistorial(id, request));
    }

    @DeleteMapping("/historial/{historialId}")
    public ResponseEntity<Void> eliminarHistorial(@PathVariable Long historialId) {
        caballoService.eliminarHistorial(historialId);
        return ResponseEntity.noContent().build();
    }
}