import 'package:flutter/material.dart';
import 'package:fulfillment_design_system/fulfillment_design_system.dart';
import '../screens/warehouse/warehouse_home.dart';
import '../screens/warehouse/tasks_screen.dart';
import '../screens/warehouse/scan_screen.dart';
import '../screens/warehouse/profile_screen.dart';

class WarehouseApp extends StatelessWidget {
  const WarehouseApp({super.key, required this.onSwitchBrand});
  final VoidCallback onSwitchBrand;

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'FDS Warehouse',
      theme: FdsTheme.brandA,
      debugShowCheckedModeBanner: false,
      home: WarehouseShell(onSwitchBrand: onSwitchBrand),
    );
  }
}

class WarehouseShell extends StatefulWidget {
  const WarehouseShell({super.key, required this.onSwitchBrand});
  final VoidCallback onSwitchBrand;

  @override
  State<WarehouseShell> createState() => _WarehouseShellState();
}

class _WarehouseShellState extends State<WarehouseShell> {
  int _tab = 0;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final screens = [
      const WarehouseHomeScreen(),
      const TasksScreen(),
      const ScanScreen(),
      ProfileScreen(onSwitchBrand: widget.onSwitchBrand),
    ];

    return Scaffold(
      body: screens[_tab],
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _tab,
        onTap: (i) => setState(() => _tab = i),
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.dashboard_outlined), activeIcon: Icon(Icons.dashboard), label: 'Dashboard'),
          BottomNavigationBarItem(icon: Icon(Icons.checklist_outlined), activeIcon: Icon(Icons.checklist), label: 'Tareas'),
          BottomNavigationBarItem(icon: Icon(Icons.qr_code_scanner_outlined), activeIcon: Icon(Icons.qr_code_scanner), label: 'Escanear'),
          BottomNavigationBarItem(icon: Icon(Icons.person_outline), activeIcon: Icon(Icons.person), label: 'Perfil'),
        ],
      ),
    );
  }
}
