package com.caballeriza.service;

import com.caballeriza.model.*;
import com.caballeriza.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AlimentacionService {

    private final PlanAlimentacionRepository planRepository;
    private final SuministroRepository suministroRepository;
    private final InventarioRepository inventarioRepository;
    private final AlertaRepository alertaRepository;

    public List<PlanAlimentacion> listarPlanes(Long caballoId) {
        return planRepository.findByCaballoId(caballoId);
    }

    public PlanAlimentacion crearPlan(PlanAlimentacion plan) {
        return planRepository.save(plan);
    }

    public void eliminarPlan(Long id) {
        planRepository.deleteById(id);
    }

    public Suministro registrarSuministro(Suministro suministro) {
        return suministroRepository.save(suministro);
    }

    public List<Suministro> listarSuministros(Long caballoId) {
        return suministroRepository.findByCaballoId(caballoId);
    }

    public List<Inventario> listarInventario() {
        return inventarioRepository.findAll();
    }

    public Inventario crearInventario(Inventario inventario) {
        return inventarioRepository.save(inventario);
    }

    public Inventario actualizarInventario(Long id, Inventario datos) {
        Inventario inventario = inventarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Inventario no encontrado: " + id));
        inventario.setNombre(datos.getNombre());
        inventario.setTipo(datos.getTipo());
        inventario.setCantidad(datos.getCantidad());
        inventario.setUnidad(datos.getUnidad());
        inventario.setStockMinimo(datos.getStockMinimo());
        Inventario actualizado = inventarioRepository.save(inventario);
        verificarStockBajo(actualizado);
        return actualizado;
    }

    private void verificarStockBajo(Inventario inventario) {
        if (inventario.getCantidad() <= inventario.getStockMinimo()) {
            Alerta alerta = Alerta.builder()
                    .tipo(Alerta.TipoAlerta.STOCK_BAJO)
                    .mensaje("Stock bajo: " + inventario.getNombre()
                            + " — quedan " + inventario.getCantidad()
                            + " " + inventario.getUnidad())
                    .fechaGenerada(java.time.LocalDateTime.now())
                    .leida(false)
                    .referenciaId(inventario.getId())
                    .build();
            alertaRepository.save(alerta);
        }
    }

    public List<Inventario> listarStockBajo() {
        return inventarioRepository.findStockBajo();
    }
}