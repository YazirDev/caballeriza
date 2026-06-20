package com.caballeriza.service;

import com.caballeriza.model.*;
import com.caballeriza.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AlertaService {

    private final AlertaRepository alertaRepository;
    private final HistorialMedicoRepository historialMedicoRepository;
    private final InventarioRepository inventarioRepository;

    public List<Alerta> listarNoLeidas() {
        return alertaRepository.findByLeidaFalse();
    }

    public List<Alerta> listarTodas() {
        return alertaRepository.findAll();
    }

    public Alerta marcarLeida(Long id) {
        Alerta alerta = alertaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Alerta no encontrada: " + id));
        alerta.setLeida(true);
        return alertaRepository.save(alerta);
    }

    public void generarAlertasAutomaticas() {
        LocalDate hoy = LocalDate.now();
        LocalDate en7Dias = hoy.plusDays(7);

        List<HistorialMedico> proximos = historialMedicoRepository
                .findByFechaVencimientoBetween(hoy, en7Dias);

        for (HistorialMedico h : proximos) {
            Alerta alerta = Alerta.builder()
                    .tipo(h.getTipo() == HistorialMedico.TipoRegistro.VACUNA
                            ? Alerta.TipoAlerta.VACUNA_PROXIMA
                            : Alerta.TipoAlerta.TRATAMIENTO_VENCIDO)
                    .mensaje("Vence el " + h.getFechaVencimiento()
                            + ": " + h.getDescripcion()
                            + " — " + h.getCaballo().getNombre())
                    .fechaGenerada(java.time.LocalDateTime.now())
                    .leida(false)
                    .referenciaId(h.getCaballo().getId())
                    .build();
            alertaRepository.save(alerta);
        }

        List<Inventario> stockBajo = inventarioRepository.findStockBajo();
        for (Inventario i : stockBajo) {
            Alerta alerta = Alerta.builder()
                    .tipo(Alerta.TipoAlerta.STOCK_BAJO)
                    .mensaje("Stock bajo: " + i.getNombre()
                            + " — quedan " + i.getCantidad() + " " + i.getUnidad())
                    .fechaGenerada(java.time.LocalDateTime.now())
                    .leida(false)
                    .referenciaId(i.getId())
                    .build();
            alertaRepository.save(alerta);
        }
    }
}