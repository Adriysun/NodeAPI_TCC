class Usuario{
    
    #Nome;
    #Sobrenome;
    #CPF
    #Email;
    #Senha;
    #DataNasci;
   // #ImgUsu;

    constructor(Nome, Sobrenome, CPF, Email, Senha, DataNasci, /*ImgUsu*/)
    {
       this.#Nome      = Nome;
       this.#SobreNome = Sobrenome;
       this.#CPF       = CPF;
       this.#Email     = Email;
       this.#Senha     = Senha;
       this.#DataNasci = DataNasci;
       //this.#ImgUsu    = ImgUsu;
    }

    get Nome(){
        return this.#Nome;
    }

    get Sobrenome(){
        return this.#Sobrenome;
    }

    get CPF(){
        return this.#CPF;
    }

    get Email(){
        return this.#Email;
    }

    get Senha(){
        return this.#Senha;
    }

    get DataNasci(){
        return this.#DataNasci;
    }

    /*
    get ImgUsu(){
        return this.#ImgUsu;
    }
    */


    set Nome (Nome) {
        if (Nome === undefined || typeof Nome !== 'string' || Nome === "" )
            throw ('Nome Invalido!!');

        this.#Nome=Nome;
    }

    set Sobrenome (Sobrenome) {
        if (Sobrenome === undefined || typeof Sobrenome !== 'string' || Sobrenome === "" )
            throw ('Sobrenome Invalido!!');

        this.#Sobrenome=Sobrenome;
    }

    set CPF (CPF) {
        if (CPF === undefined || typeof CPF !== 'number' || isNaN(CPF) || CPF !== parseInt(CPF) || CPF <= 0 || CPF.length() > 11 )
            throw ('CPF Invalido!!');

        this.#CPF=CPF;
    }

    set Email (Email) {
        if (Email === undefined || typeof Email !== 'string' || Email === "" )
            throw ('Email Invalido!!');

        this.#Email=Email;
    }

    set Senha (Senha) {
        if (Senha === undefined || typeof Senha !== 'string' || Senha === "" )
            throw ('Senha Invalida!!');

        this.#Senha=Senha;
    }

    set DataNasci (DataNasci) {
        if (DataNasci === undefined || typeof DataNasci !== 'number' || isNaN(DataNasci) ||DataNasci !== parseInt(DataNasci) || DataNasci <= 0 || DataNasci.length() > 8 )
            throw ('Data de nascimento Invalida!!');

        this.#DataNasci=DataNasci;
    }

    /*
    set ImgUsu (ImgUsu) {
        if (ImgUsu === undefined || typeof ImgUsu !== 'string' || ImgUsu === "" )
            throw ('Imagem Invalida!!');

        this.#ImgUsu=ImgUsu;
    }
    */    
}

function novoUsuario(Nome, Sobrenome, CPF, Email, Senha, DataNasci, /*ImgUsu*/) {
    return new Usuario(Nome, Sobrenome, CPF, Email, Senha, DataNasci, /*ImgUsu*/);
}

module.exports={novoUsuario};