import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config(); // Carregar variáveis de ambiente

@Injectable()
export class SupabaseService {
  private supabase;

  constructor() {
    // Instanciando o cliente do Supabase
    const supabaseUrl = 'https://ckegikmmxzzqxrstwwob.supabase.co';

    const supabaseKey = process.env.SUPABASE_KEY;
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  // Exemplo de método para buscar dados
  async getData(tableName: string) {
    const { data, error } = await this.supabase.from(tableName).select('*');
    if (error) {
      throw new Error(`Erro ao buscar dados: ${error.message}`);
    }
    return data;
  }

  // Exemplo de método para inserir dados
  async insertData(tableName: string, data: any) {
    const { data: insertedData, error } = await this.supabase
      .from(tableName)
      .insert([data]);
    if (error) {
      throw new Error(`Erro ao inserir dados: ${error.message}`);
    }
    return insertedData;
  }
}
