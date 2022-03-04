var id = 0;
window.onload = function() {
    receberFilter();
    pagarFilter();
    estudoFilter();
    amtFilter();
};

function select(id) {

    $('#menu_nav').removeClass('active');
    $('#menu_nav').addClass('nav-close');

    $('#'+id).removeClass('nav-close');
    $('#'+id).addClass('active');
};

function exit(id) {

    $('#menu_nav').addClass('active');
    $('#menu_nav').removeClass('nav-close');

    $('#'+id).addClass('nav-close');
    $('#'+id).removeClass('active');
};

//Contas a Receber
function receberFilter() {

    clearTable('tbCR1');
    clearTable('tbCR2');

    id = 0;
    var aTb = [];
    var aTb2 = [];
    var arrayConst = [];
    var table = document.getElementById("tbCR1");
    var table2 = document.getElementById("tbCR2");
    var clickCR = 0;

    receberHeader();

    //Filtros
    var deE = $('#date1').val(); 
    var ateE = $('#date2').val(); 
    var deA = $('#date3').val(); 
    var ateA = $('#date4').val();

    var numbOrc = $('#nOrc').val(); 
    var cp = $('#cp').val(); 
    var nEstudo = $('#nameEst').val(); 
    var item = $('#item').val();
    
    var e1 = deE.replace('-','');
    e1 = e1.replace('-','');
    var e2 = ateE.replace('-','');
    e2 = e2.replace('-','');

    var a1 = deA.replace('-','');
    a1 = a1.replace('-','');
    var a2 = ateA.replace('-','');
    a2 = a2.replace('-','');

    //Tabela
    var tb_name = "tabelaOrcamento";
    var tableConst = DatasetFactory.createConstraint("tablename", tb_name, tb_name, ConstraintType.MUST); // Usar sempre tablename
    arrayConst.push(tableConst);
    
    if (deE != "" && ateE != "") {
        var filterConst = DatasetFactory.createConstraint("tb_dateEcod", e1, e2, ConstraintType.MUST); // Nome do campo a uzar como parâmetro
        arrayConst.push(filterConst);
    }
    if (deA != "" && ateA != "") {
        var filterConst = DatasetFactory.createConstraint("tb_dateAcod", a1, a2, ConstraintType.MUST); // Nome do campo a uzar como parâmetro
        arrayConst.push(filterConst);
    }    
    if (numbOrc != "") {
        var filterConst = DatasetFactory.createConstraint("tb1_orc", numbOrc, numbOrc, ConstraintType.MUST); // Nome do campo a uzar como parâmetro
        arrayConst.push(filterConst);
    }
    if (cp != "") {
        var filterConst = DatasetFactory.createConstraint("tb_cp", cp, cp, ConstraintType.MUST); // Nome do campo a uzar como parâmetro
        arrayConst.push(filterConst);
    }
    if (nEstudo != "") {
        var filterConst = DatasetFactory.createConstraint("tb_estudo", nEstudo, nEstudo, ConstraintType.MUST); // Nome do campo a uzar como parâmetro
        arrayConst.push(filterConst);
    }
    if (item != "") {
        var filterConst = DatasetFactory.createConstraint("tb_estudo", item, item, ConstraintType.MUST); // Nome do campo a uzar como parâmetro
        arrayConst.push(filterConst);
    }

    var dataset = DatasetFactory.getDataset("DSCadastroGeral", null, arrayConst, null);
    var nArray = dataset.values.length;

   for (var j = 0; j < nArray; j++) {

        var nOrc = dataset.values[j].tb1_orc;
        var dataEm = dataset.values[j].tb_dateE;
        var patroc = dataset.values[j].tb_cp;
        var item = dataset.values[j].tb1_c7_total;
        var estudo = dataset.values[j].tb_estudo;
        var dataAp = dataset.values[j].tb_dateA;

        var tsd =  dataset.values[j].tb_rOrc;
        var d =  dataset.values[j].tb_desconto;
        var ta =  dataset.values[j].tb_orcamentoDesconto;
        aTb = [];
        aTb2 = [];

        var data = new Date();
        var dia = data.getDate();     
        var mes = data.getMonth() +1;
        var ano4 = data.getFullYear();

        if (mes < 10) {
            mes = '0'+mes;
        }
        if (dia < 10) {
            dia = '0'+dia;
        }

        dia = dia.toString();
        mes = mes.toString();
        ano4 = ano4.toString();

        var afther = parseInt(ano4+mes+dia);
        var apDia = dataAp.substring(0, 2);
        var apMes = dataAp.substring(3, 5);
        var apAno = dataAp.substring(6, 10);
        var before = parseInt(apAno+apMes+apDia);

        var timeAp = afther - before; 

        clickCR++;
        id++;
        
        aTb.push(id);
        aTb.push(nOrc);
        aTb.push(dataEm);
        aTb.push(patroc);
        aTb.push(item);
        aTb.push(estudo);
        aTb.push(dataAp);
        aTb.push(timeAp+" Dia(s)");
        
        var newRow = table.insertRow(clickCR);

        for (var y = 0; y < 8; y++) {
            
            newCell = newRow.insertCell(y);
            newCell.innerHTML = aTb[y];
        }

        desc = (tsd.replace('.', '')).replace(',','.') - ta.replace(',', '.');
        desc = parseFloat(desc).toFixed(2);
        desc = desc.replace('.',',');

        
        aTb2.push(id);
        aTb2.push(nOrc);
        aTb2.push(patroc);
        aTb2.push('R$ '+tsd);
        aTb2.push('R$ '+desc);
        aTb2.push(d+'%');
        aTb2.push('R$ '+ta);
        
        
        var newRow = table2.insertRow(clickCR);

        for (var y = 0; y < 7; y++) {
            
            newCell = newRow.insertCell(y);
            newCell.innerHTML = aTb2[y];
        }
    }
    
    extrato();

};

function receberHeader() {

    var cabecalho = [];
    var cabecalho2 = [];
    var table = document.getElementById("tbCR1");
    var table2 = document.getElementById("tbCR2");

    //1ª tabela
    cabecalho.push("ID"); 
    cabecalho.push("Nº Orçamento"); 
    cabecalho.push("Data de Emissão"); 
    cabecalho.push("Patrocinador"); 
    cabecalho.push("Item"); 
    cabecalho.push("Nome do Estudo"); 
    cabecalho.push("Data da Aprovação"); 
    cabecalho.push("Tempo de Aprovação");
    
    var rowHead = table.insertRow(0);
    
    for (var x = 0; x < 8; x++) {
        headCell = rowHead.insertCell(x);
        headCell.innerHTML = cabecalho[x];
    }
    
    //2ª tabela
    cabecalho2.push("ID"); 
    cabecalho2.push("Nº Orçamento"); 
    cabecalho2.push("Patrocinador"); 
    cabecalho2.push("R$ Total s/ Desconto"); 
    cabecalho2.push("R$ Total de Desconto"); 
    cabecalho2.push("% do Desconto"); 
    cabecalho2.push("R$ Total Aprovado"); 
    
    var rowHead2 = table2.insertRow(0);
    
    for (var x = 0; x < 7; x++) {
        headCell2 = rowHead2.insertCell(x);
        headCell2.innerHTML = cabecalho2[x];
    }
};

function receberClear() {
    
    $('#date1').val('');
    $('#date2').val('');
    $('#date3').val('');
    $('#date4').val('');
    $('#nOrc').val('');
    $('#cp').val('');
    $('#nameEst').val('');
    $('#item').val('');
};

function extrato() {
    
    var table = $('#tbCR2 tr');
    var rowTable = table.length -1;
    
    
    var td3_soma = 0;
    var td4_soma = 0;
    var td6_soma = 0;
    
    for(var i = 1; i <= rowTable; i++) {
        
        var td3 = table[i].cells[3].outerText
        var td4 = table[i].cells[4].outerText
        var td6 = table[i].cells[6].outerText
        
        td3 = ((td3.replace('R$ ', '')).replace('.','')).replace(',','.');
        td3_soma = td3_soma + parseFloat(td3); 
        
        td4 = (td4.replace('R$ ', '')).replace(',','.');
        td4_soma = td4_soma + parseFloat(td4);
        
        td6 = (td6.replace('R$ ', '')).replace(',','.');
        td6_soma = td6_soma + parseFloat(td6);
        
    }
    
    var percent1 = (td6_soma/td3_soma)*100;
    var percent2 = (100 - percent1).toFixed(2);
    
    td3_soma = (td3_soma.toFixed(2)).replace('.',',');
    td4_soma = (td4_soma.toFixed(2)).replace('.',',');
    td6_soma = (td6_soma.toFixed(2)).replace('.',',');
    
    $('#orcEnc').val(rowTable);
    $('#vsD').val('R$ '+td3_soma);
    $('#vD').val('R$ '+td4_soma);
    $('#vDp').val(percent2+'%');
    $('#vcD').val('R$ '+td6_soma);
    
    
};

// Contas a Pagar
function pagarFilter() {
    clearTable('tbCP1');
    clearTable('tbCP2');
    pagarHeader();
    var constraint = [];
    
    var dataDe = $('#dateEm').val();
    var dataAte = $('#dateEm2').val();
    var nSC = $('#nSC').val();
    var gestorAp = $('#gestorA').val();
    
    if (dataDe != "" && dataAte != "") {
        dataDe = dataDe.replace('-','');
        dataDe = dataDe.replace('-','');
        dataAte = dataAte.replace('-','');
        dataAte = dataAte.replace('-','');
        var c1 = DatasetFactory.createConstraint("develop_date", dataDe, dataAte, ConstraintType.MUST);
        constraint.push(c1);
    }
    if (nSC != "") {
        var c2 = DatasetFactory.createConstraint("idSeq", nSC, nSC, ConstraintType.SHOULD, true);
        constraint.push(c2);
    }
    if (gestorAp != "") {
        var c3 = DatasetFactory.createConstraint("aprovacao_responsavel_gerente", gestorAp, gestorAp, ConstraintType.SHOULD, true);
        constraint.push(c3);
    }
    
    if (constraint != "") {
        var dataset = DatasetFactory.getDataset("DSFormulariodeSolicitacaodeCompras", null, constraint, null);
    }
    else {
        var dataset = DatasetFactory.getDataset("DSFormulariodeSolicitacaodeCompras", null, null, null);
    }
    
    
    var table = document.getElementById("tbCP1");
    var table2 = document.getElementById("tbCP2");
    
    var clickCR = 0;
    var id = 0;
    
    var nRowData = dataset.values.length;
    
    for (var i = 0; i < nRowData; i++) {
        var aTb = [];
        var aTb2 = [];
        id++;
        clickCR++;
        
        
        var data = dataset.values[i].date_solicitation;
        var nSolict = dataset.values[i].idSeq;
        var gestor = dataset.values[i].aprovacao_data_gerente;
        var finaceiro = dataset.values[i].aprovacao_data_finan;
        var prazo = dataset.values[i].prazo_insp;
        
        var totalAp = dataset.values[i].tpayment;
        var prazoPag = dataset.values[i].tdate;

        var ano = prazo.substring(0, 4);
        var mes = prazo.substring(5, 7);
        var dia = prazo.substring(8, 10);
        
        prazo = dia+'/'+mes+'/'+ano;
        
        var ano1 = prazoPag.substring(0, 4);
        var mes1 = prazoPag.substring(5, 7);
        var dia1 = prazoPag.substring(8, 10);

        prazoPag = dia1+'/'+mes1+'/'+ano1;
        
        aTb.push(id);
        aTb.push(data);
        aTb.push(nSolict);
        aTb.push(gestor);
        aTb.push(finaceiro);
        aTb.push(prazo);
        aTb.push('Finalizado');
        
        var newRow = table.insertRow(clickCR);
        
        for (var y = 0; y < 7; y++) {
            
            newCell = newRow.insertCell(y);
            newCell.innerHTML = aTb[y];
        }
        
        aTb2.push(id);     
        aTb2.push('R$ '+totalAp);
        aTb2.push(prazoPag);
        aTb2.push('Finalizado');
        
        
        var newRow = table2.insertRow(clickCR);
        
        for (var y = 0; y < 4; y++) {
            
            newCell = newRow.insertCell(y);
            newCell.innerHTML = aTb2[y];
        }
    }
    
    //Extrado
    var table = $('#tbCP2 tr');
    var rowTable = table.length -1;
    
    var td2_soma = 0;
    
    for(var i = 1; i <= rowTable; i++) {
        
        var td2 = table[i].cells[1].outerText
        
        td2 = ((td2.replace('R$ ', '')).replace('.','')).replace(',','.');
        if (td2 != "") {
            td2_soma = td2_soma + parseFloat(td2);
        }

    }
    
    td2_soma = (td2_soma.toFixed(2)).replace('.',',');
    
    $('#buscSoli').val(rowTable);
    $('#totalAp').val('R$ '+td2_soma);

};

function pagarHeader() {
    var cabecalho = [];
    var cabecalho2 = [];
    var table = document.getElementById("tbCP1");
    var table2 = document.getElementById("tbCP2");
    
    //1ª tabela
    cabecalho.push("ID"); 
    cabecalho.push("Data"); 
    cabecalho.push("Nº da Solicitação"); 
    cabecalho.push("Aprovação Gestor"); 
    cabecalho.push("Aprovação Financeiro"); 
    cabecalho.push("Prazo de Entrega"); 
    cabecalho.push("Status da Entrega"); 
    
    var rowHead = table.insertRow(0);
    
    for (var x = 0; x < 7; x++) {
        headCell = rowHead.insertCell(x);
        headCell.innerHTML = cabecalho[x];
    }
    
    //2ª tabela
    cabecalho2.push("ID"); 
    cabecalho2.push("R$ Total Aprovado"); 
    cabecalho2.push("Prazo de Pagamento"); 
    cabecalho2.push("Status de Pagamento"); 
    
    var rowHead2 = table2.insertRow(0);
    
    for (var x = 0; x < 4; x++) {
        headCell2 = rowHead2.insertCell(x);
        headCell2.innerHTML = cabecalho2[x];
    }
};

function pagarClear() {
    $('#dateEm').val("");
    $('#dateEm2').val("");
    $('#nSC').val("");
    $('#gestorA').val("");
};

//Status de Estudo
function estudoFilter() {
    clearTable('tbSE1');
    clearTable('tbSE2');
    estudoHeader();
    var table = document.getElementById("tbSE1");
    var table2 = document.getElementById("tbSE2");
    var clickCR = 0;
    var id = 0;

    var cliente_f = $('#CP').val();
    var nEstudo_f = $('#nEstudo').val();
    var setor_f = $('#setorResp').val();
    var statusProj_f = $('#statusProj').val();
    var orc1_f = $('#nOD').val();
    var orc2_f = $('#nOA').val();
    var constraintIF = [];

    if (cliente_f != "") {
        var c1 = DatasetFactory.createConstraint("cp_project", cliente_f, cliente_f, ConstraintType.SHOULD, true);
        constraintIF.push(c1);
    }
    if (nEstudo_f != "") {
        var c2 = DatasetFactory.createConstraint("nProject", nEstudo_f, nEstudo_f, ConstraintType.SHOULD, true);
        constraintIF.push(c2);
    }
    if (setor_f != "") {
        var c3 = DatasetFactory.createConstraint("name_project", setor_f, setor_f, ConstraintType.SHOULD, true);
        constraintIF.push(c3);
    }
    if (statusProj_f != "") {
        var c4 = DatasetFactory.createConstraint("status_project", statusProj_f, statusProj_f, ConstraintType.SHOULD, true);
        constraintIF.push(c4);
    }
    if (orc1_f != "" && orc2_f != "") {
        var c5 = DatasetFactory.createConstraint("nOrc_project", orc1_f, orc2_f, ConstraintType.SHOULD, true);
        constraintIF.push(c5);
    }

    if (constraintIF != "") {
        var estudo = DatasetFactory.getDataset("DSFormulariodeCronogramadeEstudo", null, constraintIF, null);
    }
    else {
        var estudo = DatasetFactory.getDataset("DSFormulariodeCronogramadeEstudo", null, null, null);
    }
    

    var rowEstudo = estudo.values.length;
    
    for (var i = 0; i < rowEstudo; i++) {
        
        //DADOS DO DATASET - CRONOGRAMA DE ESTUDO
        var cp = estudo.values[i].client_patroc_search; //Cliente/Patrocinador
        var nOrc = estudo.values[i].number_orc; //NºOrçamento
        var revisão = 1; // Revisão
        var nEstudo = estudo.values[i].number_project //Nº Estudo/Projeto
        var setResp = estudo.values[i].name_project // Setor Responsável
        var statusProj = estudo.values[i].status_project //Status do Projeto

        //DADOS DO DATASET - ORÇAMENTO
        var c1 = DatasetFactory.createConstraint("idO", nOrc, nOrc, ConstraintType.MUST);
        var constraints = new Array(c1);
        var orc = DatasetFactory.getDataset("DSCadastroGeral", null, constraints, null);

        var statusOrc = orc.values[0].statusO; //Status do Orçamento
        var aprovOrc = orc.values[0].dateAprov; //Data de Aprovação

        //DADOS DO DATASET - AMOSTRA
        var c2 = DatasetFactory.createConstraint("select_orc", nOrc, nOrc, ConstraintType.MUST);
        var constraints2 = new Array(c2);
        var amt = DatasetFactory.getDataset("DSFormulariodeCadastrodeAmostra", null, constraints2, null);

        var datePrazo = amt.values[0].prazo_receb;
        datePrazo = datePrazo.replace('-','');
        datePrazo = datePrazo.replace('-','');

        var dateAmt = amt.values[0].date_receb;
        if (dateAmt == "") {
            var statusAmt = 'Esperando Amostra' //Status da amostras
        }
        else {
            dateAmt = dateAmt.replace('-','');
            dateAmt = dateAmt.replace('-','');

            if (datePrazo >= dateAmt) {
                var statusAmt = 'Finalizado' //Status da amostra
            }
            else {
                var statusAmt = 'Atrasado' //Status da amostra
            }
        }

        var codAmt = amt.values[0].cod_amt; // Código da amostra
        var fip = amt.values[0].fip_sn //FIP
        var formula = amt.values[0].formula_sn; //Fórmula

        //DADOS DA TABLEA - CRONOGRAMA DE ESTUDO
        var tb_name = "tb_sub"; 
        var tbConstraint = DatasetFactory.createConstraint("tablename", tb_name, tb_name, ConstraintType.MUST); // Usar sempre tablename
        var c3 = DatasetFactory.createConstraint("tb_orc", nOrc, nOrc, ConstraintType.MUST); // Usar sempre tablename
        var arrayConstraint = new Array(tbConstraint); // Tranformas as duas constraint em Array
        var arrayTable = DatasetFactory.getDataset("DSFormulariodeCronogramadeEstudo", null, arrayConstraint, null);

        var nTable = arrayTable.values.length;


        for (var j = 0; j < nTable; j++) {
            id++;
            clickCR++;
            var aTb = [];
            var aTb2 = [];

            var item = arrayTable.values[j].tb_descSI;
            var statusItem = arrayTable.values[j].tb_status1;
        
            aTb.push(id);
            aTb.push(cp);
            aTb.push(nOrc);
            aTb.push(revisão);
            aTb.push(statusOrc);
            aTb.push(aprovOrc);
            aTb.push(nEstudo);
            aTb.push(item);
            
            
            var newRow = table.insertRow(clickCR);
            
            for (var y = 0; y < 8; y++) {
                
                newCell = newRow.insertCell(y);
                newCell.innerHTML = aTb[y];
            }
            
            aTb2.push(id);     
            aTb2.push(setResp);     
            aTb2.push(statusItem);     
            aTb2.push(statusAmt);     
            aTb2.push(codAmt);     
            aTb2.push(fip);     
            aTb2.push(formula);     
            aTb2.push(statusProj);     
            
            
            
            var newRow = table2.insertRow(clickCR);
            
            for (var y = 0; y < 8; y++) {
                
                newCell = newRow.insertCell(y);
                newCell.innerHTML = aTb2[y];
            }
        }
    }
};

function estudoHeader() {
    var cabecalho = [];
    var cabecalho2 = [];
    var table = document.getElementById("tbSE1");
    var table2 = document.getElementById("tbSE2");
    
    //1ª tabela
    cabecalho.push("ID"); 
    cabecalho.push("Cliente/Patrocinador"); 
    cabecalho.push("Nº Orçamento"); 
    cabecalho.push("Revisão"); 
    cabecalho.push("Status do Orçamento"); 
    cabecalho.push("Data Aprovação"); 
    cabecalho.push("Nº Estudo/Projeto"); 
    cabecalho.push("Item do Orçamento"); 
    
    var rowHead = table.insertRow(0);
    
    for (var x = 0; x < 8; x++) {
        headCell = rowHead.insertCell(x);
        headCell.innerHTML = cabecalho[x];
    }
    
    //2ª tabela
    cabecalho2.push("ID");
    cabecalho2.push("Setor Responsável"); 
    cabecalho2.push("Status do item"); 
    cabecalho2.push("Status da Amostra"); 
    cabecalho2.push("Código da Amostra"); 
    cabecalho2.push("FIP"); 
    cabecalho2.push("Fórmula"); 
    cabecalho2.push("Status do Projeto"); 
    
    var rowHead2 = table2.insertRow(0);
    
    for (var x = 0; x < 8; x++) {
        headCell2 = rowHead2.insertCell(x);
        headCell2.innerHTML = cabecalho2[x];
    }
};

function estudoClear() {
    $('#CP').val("");
    $('#nEstudo').val("");
    $('#setorResp').val("");
    $('#statusProj').val("");
    $('#nOD').val("");
    $('#nOA').val("");
};

//Amostra
function amtFilter() {
    
    clearTable('tbAMT1');
    clearTable('tbAMT2');
    amtHeader();

    var table = document.getElementById("tbAMT1");
    var table2 = document.getElementById("tbAMT2");
    var clickCR = 0;
    var id = 0;
    var constraint = [];    
    
    var clientP = $('#clientP').val();
    var nOrcamento = $('#nOrcAmt').val();
    var numberEst = $('#numbEsto').val();
    var statusAmostra = $('#statusAmt').val();
    var codAmostra = $('#codAmt').val();
    var fip_filter = $('#fip').val();
    var formula_filter = $('#formula').val();

    if (clientP != "") {
        var c1 = DatasetFactory.createConstraint("client_patroc", clientP, clientP, ConstraintType.SHOULD, true);
        constraint.push(c1);
    }
    if (nOrcamento != "") {
        var c2 = DatasetFactory.createConstraint("select_orc", nOrcamento, nOrcamento, ConstraintType.SHOULD, true);
        constraint.push(c2);
    }
    if (numberEst != "") {
        var c3 = DatasetFactory.createConstraint("numb_project", numberEst, numberEst, ConstraintType.SHOULD, true);
        constraint.push(c3);
    }
    if (codAmostra != "") {
        var c4 = DatasetFactory.createConstraint("cod_amt", codAmostra, codAmostra, ConstraintType.SHOULD, true);
        constraint.push(c4);
    }
    if (fip_filter != "") {
        var c5 = DatasetFactory.createConstraint("fip_sn", fip_filter, fip_filter, ConstraintType.SHOULD, true);
        constraint.push(c5);
    }
    if (formula_filter != "") {
        var c6 = DatasetFactory.createConstraint("formula_sn", formula_filter, formula_filter, ConstraintType.SHOULD, true);
        constraint.push(c6);
    }

    if (constraint != "") {
        var amt = DatasetFactory.getDataset("DSFormulariodeCadastrodeAmostra", null, constraint, null);
    } else {
    var amt = DatasetFactory.getDataset("DSFormulariodeCadastrodeAmostra", null, null, null);
    }
    
    console.log(amt);
    console.log(movAmt);

    var nAmt = amt.values.length;
   
    for (var i = 0; i < nAmt; i++) {

        var cp = amt.values[i].client_patroc; //Cliente/Patrocinador
        var nOrc = amt.values[i].select_orc; //Nº Orçamento
        var nEst = amt.values[i].numb_project; //Nº Estudo
        var statusAmt = amt.values[i].date_receb //Status da amostra
        var codAmt = amt.values[i].cod_amt; //Código da Amostra
        var lote = amt.values[i].lote_int; //Lote Patrocinador
        var fabric = amt.values[i].date_made //Data dde Fabricação
        var valid = amt.values[i].date_venc; //Validade
        var fip = amt.values[i].fip_sn //FIP
        var formula = amt.values[i].formula_sn; //Fórmula
        var resp_receb = amt.values[i].resp_receb; //Responsável Pelo recebimento
        var estoque = amt.values[i].qnt_receb+' '+amt.values[i].qnt_fracionada; //Estoque
       
        var cAmt = DatasetFactory.createConstraint("cod_amt", codAmt, codAmt, ConstraintType.MUST);
        var constraints = new Array(cAmt);
        var movAmt = DatasetFactory.getDataset("DSFormulariodeMovimentacaodeAmostra", null, constraints, null);

        var nDescrt = movAmt.values.length;
        var codDescrt = 0;

        for (var j = 0; j < nDescrt; j++) {
            var descarte = movAmt.values[j].solicitacao; //descarte
            if (descarte == "Descartar Amostra") {
                codDescrt++;
            }
        }

        if (codDescrt >= 1) {
            descarte = "Sim";
        }
        else {
            descarte = "Não";
        }
        
        if (statusAmt =! "") {
            statusAmt = "Recebido" 
        } else {
            statusAmt = "Esperando Recebimento"
        }

        id++;
        clickCR++;
        var aTb = [];
        var aTb2 = [];

        aTb.push(id);
        aTb.push(cp);
        aTb.push(nOrc);
        aTb.push(nEst);
        aTb.push(statusAmt);
        aTb.push(codAmt);
        
        var newRow = table.insertRow(clickCR);
        
        for (var y = 0; y < 6; y++) {
            
            newCell = newRow.insertCell(y);
            newCell.innerHTML = aTb[y];
        }
        
        aTb2.push(id);     
        aTb2.push(lote);     
        aTb2.push(fabric);     
        aTb2.push(valid);     
        aTb2.push(fip);     
        aTb2.push(formula);     
        aTb2.push(resp_receb);     
        aTb2.push(estoque);     
        aTb2.push(descarte);     
        
        
        
        var newRow = table2.insertRow(clickCR);
        
        for (var y = 0; y < 9; y++) {
            
            newCell = newRow.insertCell(y);
            newCell.innerHTML = aTb2[y];
        }
    }
        
    
};

function amtHeader() {
    var cabecalho = [];
    var cabecalho2 = [];
    var table = document.getElementById("tbAMT1");
    var table2 = document.getElementById("tbAMT2");
    
    //1ª tabela
    cabecalho.push("ID"); 
    cabecalho.push("Cliente/Patrocinador"); 
    cabecalho.push("Nº Orçamento"); 
    cabecalho.push("Nº Estudo/Projeto"); 
    cabecalho.push("Status da Amostra"); 
    cabecalho.push("Código Amostra"); 
    
    
    var rowHead = table.insertRow(0);
    
    for (var x = 0; x < 6; x++) {
        headCell = rowHead.insertCell(x);
        headCell.innerHTML = cabecalho[x];
    }
    
    //2ª tabela
    cabecalho2.push("ID");
    cabecalho2.push("Lote de Patrocinador"); 
    cabecalho2.push("Data de Fabricação"); 
    cabecalho2.push("Validade"); 
    cabecalho2.push("FIP"); 
    cabecalho2.push("Fórmula"); 
    cabecalho2.push("Responsável pelo receb."); 
    cabecalho2.push("Estoque"); 
    cabecalho2.push("Descarte Realizado"); 
    
    var rowHead2 = table2.insertRow(0);
    
    for (var x = 0; x < 9; x++) {
        headCell2 = rowHead2.insertCell(x);
        headCell2.innerHTML = cabecalho2[x];
    }
};

function amtClear() {
    $('#clientP').val("");
    $('#nOrcAmt').val("");
    $('#numbEst').val("");
    $('#statusAmt').val("");
    $('#codAmt').val("");
    $('#fip').val("");
    $('#formula').val("");
    $('#pRD').val("");
    $('#pRA').val("");
}


function clearTable(tb) {

    $('#'+tb+' tr').remove();
};

function printDiv(divName) {

    var printContents = document.getElementById(divName).innerHTML;
    var originalContents = document.body.innerHTML;
    
    document.body.innerHTML = printContents;
    
    window.print();
    
    document.body.innerHTML = originalContents;
    
};