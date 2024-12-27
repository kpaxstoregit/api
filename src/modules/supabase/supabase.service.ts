import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private readonly supabase: SupabaseClient;

  constructor() {
    const supabaseUrl = process.env.DATABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY;

    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  async testConnection(): Promise<boolean> {
    try {
      // Tente listar tabelas do banco de dados (ou qualquer query)
      const { data, error } = await this.supabase
        .from('Newsletter')
        .select('*');
      if (error) throw error;

      console.log('Conexão bem-sucedida:', data);
      return true;
    } catch (error) {
      console.error('Erro ao conectar ao Supabase:', error.message);
      return false;
    }
  }
}
