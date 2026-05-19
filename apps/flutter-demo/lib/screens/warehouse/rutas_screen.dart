import 'package:flutter/material.dart';
import 'package:fulfillment_design_system/fulfillment_design_system.dart';

const _rutas = [
  _Ruta('RT-001', 'Francisco Aguayo', 'Santiago Centro', 12, 8, 'En ruta'),
  _Ruta('RT-002', 'Ronald Vezga', 'Providencia', 8, 8, 'Completada'),
  _Ruta('RT-003', 'Douglas Barraza', 'Las Condes', 15, 0, 'Pendiente'),
  _Ruta('RT-004', 'Kevin Aceituno', 'Ñuñoa', 10, 6, 'En ruta'),
  _Ruta('RT-005', 'Frank San Martín', 'Maipú', 20, 20, 'Completada'),
];

class _Ruta {
  const _Ruta(this.id, this.driver, this.zone, this.total, this.done, this.status);
  final String id, driver, zone, status;
  final int total, done;
}

class RutasScreen extends StatelessWidget {
  const RutasScreen({super.key});

  static const primary = Color(0xFF006DFF);
  static const secondary = Color(0xFF0F3893);

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      backgroundColor: const Color(0xFFF4F7FF),
      appBar: AppBar(
        backgroundColor: secondary,
        foregroundColor: Colors.white,
        title: const Text('Rutas'),
        actions: [
          IconButton(icon: const Icon(Icons.add_road), onPressed: () {}),
        ],
      ),
      body: Column(
        children: [
          // Summary bar
          Container(
            color: Colors.white,
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
            child: Row(children: [
              _SumChip(Icons.route, '5 rutas hoy', primary),
              const SizedBox(width: 16),
              _SumChip(Icons.check_circle_outline, '2 completadas', const Color(0xFF047E48)),
              const SizedBox(width: 16),
              _SumChip(Icons.local_shipping_outlined, '2 en ruta', const Color(0xFFFBBF24)),
            ]),
          ),
          const Divider(height: 1),

          Expanded(
            child: ListView.separated(
              padding: const EdgeInsets.all(16),
              itemCount: _rutas.length,
              separatorBuilder: (_, __) => const SizedBox(height: 10),
              itemBuilder: (_, i) => _RutaCard(ruta: _rutas[i]),
            ),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton.extended(
        backgroundColor: primary,
        onPressed: () {},
        icon: const Icon(Icons.add),
        label: const Text('Nueva ruta'),
      ),
    );
  }
}

class _SumChip extends StatelessWidget {
  const _SumChip(this.icon, this.label, this.color);
  final IconData icon;
  final String label;
  final Color color;

  @override
  Widget build(BuildContext context) {
    return Row(children: [
      Icon(icon, color: color, size: 14),
      const SizedBox(width: 4),
      Text(label, style: TextStyle(color: color, fontSize: 12, fontWeight: FontWeight.w600)),
    ]);
  }
}

class _RutaCard extends StatelessWidget {
  const _RutaCard({required this.ruta});
  final _Ruta ruta;

  static const primary = Color(0xFF006DFF);

  @override
  Widget build(BuildContext context) {
    final statusCfg = switch (ruta.status) {
      'En ruta'    => (primary, const Color(0xFFE8F0FF)),
      'Completada' => (const Color(0xFF047E48), const Color(0xFFE8F6EE)),
      _            => (const Color(0xFF63767A), const Color(0xFFF4F7FF)),
    };
    final progress = ruta.total > 0 ? ruta.done / ruta.total : 0.0;

    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(10),
        border: Border.all(color: const Color(0xFFE2E8F0)),
      ),
      child: Padding(
        padding: const EdgeInsets.all(14),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Row(children: [
            Text(ruta.id, style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 14, color: Color(0xFF0E2B69))),
            const Spacer(),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
              decoration: BoxDecoration(color: statusCfg.$2, borderRadius: BorderRadius.circular(9999)),
              child: Row(mainAxisSize: MainAxisSize.min, children: [
                Container(width: 6, height: 6, decoration: BoxDecoration(color: statusCfg.$1, shape: BoxShape.circle)),
                const SizedBox(width: 4),
                Text(ruta.status, style: TextStyle(color: statusCfg.$1, fontSize: 11, fontWeight: FontWeight.w600)),
              ]),
            ),
          ]),
          const SizedBox(height: 6),
          Row(children: [
            const Icon(Icons.person_outline, size: 13, color: Color(0xFF63767A)),
            const SizedBox(width: 4),
            Text(ruta.driver, style: const TextStyle(fontSize: 12, color: Color(0xFF37474F))),
            const SizedBox(width: 12),
            const Icon(Icons.location_on_outlined, size: 13, color: Color(0xFF63767A)),
            const SizedBox(width: 4),
            Text(ruta.zone, style: const TextStyle(fontSize: 12, color: Color(0xFF37474F))),
          ]),
          const SizedBox(height: 12),
          Row(children: [
            Expanded(
              child: ClipRRect(
                borderRadius: BorderRadius.circular(4),
                child: LinearProgressIndicator(
                  value: progress,
                  minHeight: 6,
                  backgroundColor: const Color(0xFFE2E8F0),
                  valueColor: AlwaysStoppedAnimation(statusCfg.$1),
                ),
              ),
            ),
            const SizedBox(width: 10),
            Text('${ruta.done}/${ruta.total}',
                style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: statusCfg.$1)),
          ]),
          if (ruta.status == 'En ruta') ...[
            const SizedBox(height: 12),
            FdsButton(label: 'Ver en mapa', variant: FdsButtonVariant.ghost, fullWidth: true, leadingIcon: const Icon(Icons.map_outlined), onPressed: () {}),
          ],
        ]),
      ),
    );
  }
}
