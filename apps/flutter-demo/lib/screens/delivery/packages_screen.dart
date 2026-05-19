import 'package:flutter/material.dart';

const _packages = [
  _Pkg('PKG-001', 'María López', 'Insurgentes Sur 1234', 'Caja mediana', 'pendiente'),
  _Pkg('PKG-002', 'María López', 'Insurgentes Sur 1234', 'Sobre', 'pendiente'),
  _Pkg('PKG-003', 'Roberto Cruz', 'Blvd. M. Ávila 56', 'Caja grande', 'pendiente'),
  _Pkg('PKG-004', 'Roberto Cruz', 'Blvd. M. Ávila 56', 'Caja pequeña', 'pendiente'),
  _Pkg('PKG-005', 'Laura Díaz', 'Periférico Sur 2900', 'Sobre express', 'pendiente'),
  _Pkg('PKG-006', 'Juan Pérez', 'Calle Morelos 45', 'Caja mediana', 'entregado'),
  _Pkg('PKG-007', 'Ana García', 'Av. Reforma 800', 'Caja pequeña', 'entregado'),
];

class _Pkg {
  const _Pkg(this.id, this.name, this.address, this.type, this.status);
  final String id, name, address, type, status;
}

class PackagesScreen extends StatefulWidget {
  const PackagesScreen({super.key});
  @override
  State<PackagesScreen> createState() => _PackagesScreenState();
}

class _PackagesScreenState extends State<PackagesScreen> {
  String _filter = 'todos';
  static const primary = Color(0xFF0A8920);
  static const secondary = Color(0xFF2D3A41);

  @override
  Widget build(BuildContext context) {
    final shown = _filter == 'todos' ? _packages : _packages.where((p) => p.status == _filter).toList();
    final pendingCount = _packages.where((p) => p.status == 'pendiente').length;
    final deliveredCount = _packages.where((p) => p.status == 'entregado').length;

    return Scaffold(
      backgroundColor: const Color(0xFFF9FBFC),
      appBar: AppBar(
        backgroundColor: secondary,
        foregroundColor: Colors.white,
        title: const Text('Paquetes'),
        actions: [IconButton(icon: const Icon(Icons.search), onPressed: () {})],
      ),
      body: Column(children: [
        // Filter chips
        Container(
          color: Colors.white,
          padding: const EdgeInsets.fromLTRB(16, 12, 16, 12),
          child: SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: Row(children: [
              _Chip('Todos (${_packages.length})', 'todos', _filter, (v) => setState(() => _filter = v)),
              const SizedBox(width: 8),
              _Chip('Pendientes ($pendingCount)', 'pendiente', _filter, (v) => setState(() => _filter = v)),
              const SizedBox(width: 8),
              _Chip('Entregados ($deliveredCount)', 'entregado', _filter, (v) => setState(() => _filter = v)),
            ]),
          ),
        ),
        const Divider(height: 1),
        Expanded(
          child: ListView.separated(
            padding: const EdgeInsets.all(16),
            itemCount: shown.length,
            separatorBuilder: (_, __) => const SizedBox(height: 8),
            itemBuilder: (_, i) => _PkgCard(pkg: shown[i]),
          ),
        ),
      ]),
    );
  }
}

class _Chip extends StatelessWidget {
  const _Chip(this.label, this.value, this.selected, this.onTap);
  final String label, value, selected;
  final ValueChanged<String> onTap;
  static const primary = Color(0xFF0A8920);

  @override
  Widget build(BuildContext context) {
    final active = value == selected;
    return GestureDetector(
      onTap: () => onTap(value),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
        decoration: BoxDecoration(
          color: active ? primary : const Color(0xFFE7EBEA),
          borderRadius: BorderRadius.circular(6),
        ),
        child: Text(label, style: TextStyle(color: active ? Colors.white : const Color(0xFF37474F), fontSize: 12, fontWeight: FontWeight.w600)),
      ),
    );
  }
}

class _PkgCard extends StatelessWidget {
  const _PkgCard({required this.pkg});
  final _Pkg pkg;
  static const primary = Color(0xFF0A8920);

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isDone = pkg.status == 'entregado';
    final color = isDone ? const Color(0xFF047E48) : primary;
    final bg = isDone ? const Color(0xFFE8F6EE) : const Color(0xFFE5F8E3);

    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(10),
        border: Border.all(color: const Color(0xFFE7EBEA)),
      ),
      child: Padding(
        padding: const EdgeInsets.all(14),
        child: Row(children: [
          Container(
            padding: const EdgeInsets.all(10),
            decoration: BoxDecoration(color: bg, borderRadius: BorderRadius.circular(8)),
            child: Icon(isDone ? Icons.check_circle : Icons.inventory_2_outlined, color: color, size: 20),
          ),
          const SizedBox(width: 12),
          Expanded(child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            Row(children: [
              Text(pkg.id, style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 13, color: Color(0xFF192126))),
              const Spacer(),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                decoration: BoxDecoration(color: bg, borderRadius: BorderRadius.circular(4)),
                child: Text(pkg.status, style: TextStyle(color: color, fontSize: 10, fontWeight: FontWeight.w600)),
              ),
            ]),
            Text(pkg.name, style: const TextStyle(fontSize: 13, color: Color(0xFF192126))),
            Text(pkg.type, style: const TextStyle(fontSize: 11, color: Color(0xFF63767A))),
          ])),
        ]),
      ),
    );
  }
}
