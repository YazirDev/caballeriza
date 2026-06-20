package com.caballeriza.controller;

import com.caballeriza.model.Alerta;
import com.caballeriza.service.AlertaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/alertas")
@RequiredArgsConstructor
public class AlertaController {

    private final AlertaService alertaService;

    @GetMapping
    public ResponseEntity<List<Alerta>> listarTodas() {
        return ResponseEntity.ok(alertaService.listarTodas());
    }

    @GetMapping("/no-leidas")
    public ResponseEntity<List<Alerta>> listarNoLeidas() {
        return ResponseEntity.ok(alertaService.listarNoLeidas());
    }

    @PutMapping("/{id}/leer")
    public ResponseEntity<Alerta> marcarLeida(@PathVariable Long id) {
        return ResponseEntity.ok(alertaService.marcarLeida(id));
    }

    @PostMapping("/generar")
    public ResponseEntity<String> generarAlertas() {
        alertaService.generarAlertasAutomaticas();
        return ResponseEntity.ok("Alertas generadas correctamente");
    }
}