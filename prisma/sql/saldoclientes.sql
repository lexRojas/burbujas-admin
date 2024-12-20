     SELECT 
        a.cedula, 
        a.nombre, 
        a.telefono,
        a.fecha_ingreso,
        IFNULL(b.total_puntos, 0) as total_puntos,
        IFNULL(c.total_puntos_usados, 0) as total_puntos_usados,
        (IFNULL(b.total_puntos, 0) - IFNULL(c.total_puntos_usados, 0)) as saldo
      FROM Cliente a
      LEFT JOIN (
        SELECT 
          cedula, 
          SUM(puntos) as total_puntos 
        FROM ComprasCliente  
        WHERE NOT vencido 
        GROUP BY cedula
      ) b ON a.cedula = b.cedula
      LEFT JOIN (
        SELECT 
          cedula, 
          SUM(puntosUsados) as total_puntos_usados 
        FROM PuntosUsadosCliente  
        GROUP BY cedula
      ) c ON a.cedula = c.cedula
      GROUP BY a.cedula, a.nombre, a.telefono, a.fecha_ingreso
