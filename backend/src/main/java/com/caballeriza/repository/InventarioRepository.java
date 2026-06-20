package com.caballeriza.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.caballeriza.model.Inventario;

public interface InventarioRepository extends JpaRepository<Inventario, Long> {
    List<Inventario> findByTipo(Inventario.TipoInsumo tipo);

    @Query("SELECT i FROM Inventario i WHERE i.cantidad <= i.stockMinimo")
    List<Inventario> findStockBajo();
}