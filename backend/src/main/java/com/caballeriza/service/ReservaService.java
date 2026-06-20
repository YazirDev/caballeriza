package com.caballeriza.service;

import com.caballeriza.model.Reserva;
import com.caballeriza.repository.ReservaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReservaService {

    private final ReservaRepository reservaRepository;

    public List<Reserva> listarTodas() {
        return reservaRepository.findAll();
    }

    public Reserva obtenerPorId(Long id) {
        return reservaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reserva no encontrada: " + id));
    }

    public Reserva crear(Reserva reserva) {
        reserva.setEstado(Reserva.EstadoReserva.PENDIENTE);
        return reservaRepository.save(reserva);
    }

    public Reserva actualizar(Long id, Reserva datos) {
        Reserva reserva = obtenerPorId(id);
        reserva.setTipo(datos.getTipo());
        reserva.setFecha(datos.getFecha());
        reserva.setCaballo(datos.getCaballo());
        reserva.setResponsable(datos.getResponsable());
        reserva.setNotas(datos.getNotas());
        return reservaRepository.save(reserva);
    }

    public Reserva cancelar(Long id) {
        Reserva reserva = obtenerPorId(id);
        reserva.setEstado(Reserva.EstadoReserva.CANCELADA);
        return reservaRepository.save(reserva);
    }

    public void eliminar(Long id) {
        reservaRepository.deleteById(id);
    }

    public List<Reserva> listarPorTipo(Reserva.TipoReserva tipo) {
        return reservaRepository.findByTipo(tipo);
    }
}