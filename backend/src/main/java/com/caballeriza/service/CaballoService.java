package com.caballeriza.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.caballeriza.dto.CaballoRequest;
import com.caballeriza.dto.HistorialMedicoRequest;
import com.caballeriza.model.Caballo;
import com.caballeriza.model.HistorialMedico;
import com.caballeriza.repository.CaballoRepository;
import com.caballeriza.repository.HistorialMedicoRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CaballoService {

    private final CaballoRepository caballoRepository;
    private final HistorialMedicoRepository historialMedicoRepository;

    public List<Caballo> listarTodos() {
        return caballoRepository.findAll();
    }

    public Caballo obtenerPorId(Long id) {
        return caballoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Caballo no encontrado con id: " + id));
    }

    public Caballo crear(CaballoRequest request) {
        if (caballoRepository.existsByIdentificador(request.getIdentificador())) {
            throw new RuntimeException("Ya existe un caballo con ese identificador");
        }

        Caballo caballo = Caballo.builder()
                .nombre(request.getNombre())
                .identificador(request.getIdentificador())
                .edad(request.getEdad())
                .raza(request.getRaza())
                .sexo(request.getSexo())
                .peso(request.getPeso())
                .fotoUrl(request.getFotoUrl())
                .build();

        return caballoRepository.save(caballo);
    }

    public Caballo actualizar(Long id, CaballoRequest request) {
        Caballo caballo = obtenerPorId(id);

        caballo.setNombre(request.getNombre());
        caballo.setIdentificador(request.getIdentificador());
        caballo.setEdad(request.getEdad());
        caballo.setRaza(request.getRaza());
        caballo.setSexo(request.getSexo());
        caballo.setPeso(request.getPeso());
        caballo.setFotoUrl(request.getFotoUrl());

        return caballoRepository.save(caballo);
    }

    public void eliminar(Long id) {
        if (!caballoRepository.existsById(id)) {
            throw new RuntimeException("Caballo no encontrado con id: " + id);
        }
        caballoRepository.deleteById(id);
    }

    public List<HistorialMedico> obtenerHistorial(Long caballoId) {
        obtenerPorId(caballoId);
        return historialMedicoRepository.findByCaballoId(caballoId);
    }

    public HistorialMedico agregarHistorial(Long caballoId, HistorialMedicoRequest request) {
        Caballo caballo = obtenerPorId(caballoId);

        HistorialMedico registro = HistorialMedico.builder()
                .caballo(caballo)
                .tipo(request.getTipo())
                .descripcion(request.getDescripcion())
                .responsable(request.getResponsable())
                .fecha(request.getFecha())
                .fechaVencimiento(request.getFechaVencimiento())
                .build();

        return historialMedicoRepository.save(registro);
    }

    public void eliminarHistorial(Long historialId) {
        if (!historialMedicoRepository.existsById(historialId)) {
            throw new RuntimeException("Registro no encontrado con id: " + historialId);
        }
        historialMedicoRepository.deleteById(historialId);
    }
}