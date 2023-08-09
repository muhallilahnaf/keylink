<script>
	import {KW, toast} from '$lib/stores.js';
    import {
        delimiter, 
        getTextListFromInput, 
        loading, 
        getTextListFromFile
    } from '$lib/util/loadKW.js';

    const closeModal = () => {
        document.getElementById('kw-modal-load-close').click()
    }

    const loadKW = async () => {
        const delim = document
            .querySelector('#kw-modal-load input[name=kw-delimiter]:checked')
            .id
            .replace('kw-delimiter-', '')
        const excludeList = getTextListFromInput(
            'kw-exclude-words', 
            ','
        )
        const fileInput = document.getElementById('kw-load-text-file')
        const existsKWFile = (fileInput.value != '')
        if (existsKWFile) {
            const file = fileInput.files[0];
            const textType = /text.*/;
            if (!file.type.match(textType)) {
                closeModal()
                $toast = {
                    message: 'Error: Uploaded file is not a text file.',
                    color: 'bg-danger text-light'
                }
                return
            }
            const reader = new FileReader();
            reader.onload = () => {
                const content = reader.result;
                const kwList = getTextListFromFile(content, delimiter[delim]);
                fetchKWData({kwList, excludeList})
            }
            reader.readAsText(file)
            return
        }
        const kwList = getTextListFromInput(
            'input-load-kw', 
            delimiter[delim]
        )
        const existsKWText = !(kwList.length == 1 && kwList[0] == '')
        if (existsKWText) {
            fetchKWData({kwList, excludeList})
            return
        }    
        closeModal()
        $toast = {
            message: 'Error: No keyword data given.',
            color: 'bg-danger text-light'
        }
    }

    const fetchKWData = async ({kwList, excludeList}) => {
        loading('#kw-modal-load', true)
        const response = await fetch('/process', {
            method: 'POST',
            body: JSON.stringify({
                kw: 'new', 
                kwList,
                excludeList
            }),
            headers: {
                'content-type': 'application/json'
            }
        });
		const data = await response.json();
        loading('#kw-modal-load', false)
        closeModal()
        if (data.error) {
            $toast = {
			    message: data.message,
			    color: 'bg-danger text-light'
		    }
            return
        }
        $toast = {
            message: data.message,
            color: 'bg-success text-light'
        }
        $KW = data.KW
    }
</script>

<div 
    class="modal fade" 
    id="kw-modal-load" 
    tabindex="-1" 
    aria-labelledby="label-kw-modal-load" 
    aria-hidden="true"
>
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header bg-light">
                <h1 class="modal-title fs-5" id="label-kw-modal-load">
                    Load Keywords
                </h1>
                <button 
                    type="button" 
                    class="btn-close" 
                    data-bs-dismiss="modal" 
                    aria-label="Close"
                    id="kw-modal-load-close"
                >
                </button>
            </div>
            <div class="modal-body bg-light">
                <div class="bg-tertiary mb-3 p-2">
                    <div class="mb-3">
                        <label 
                            for="input-load-kw" 
                            class="form-label"
                        >
                            Paste Keywords
                        </label>
                        <textarea 
                            rows="7" 
                            class="form-control shadow-none"
                            aria-label="Paste Keywords" 
                            id="input-load-kw"
                        />     
                    </div>                   
                    <div class="mb-3 d-flex justify-content-center">
                        <h6>OR</h6>
                    </div>
                    <label 
                        for="kw-load-text-file" 
                        class="form-label"
                    >
                        Load Text File
                    </label>
                    <input 
                        type="file"
                        accept=".txt"
                        class="form-control form-control-sm" 
                        id="kw-load-text-file" 
                        aria-label="Upload"
                    >
                </div>
                <div class="bg-tertiary p-2">
                    <div class="mb-2">
                        <label 
                            for="kw-exclude-words" 
                            class="form-label"
                        >
                            Exclude Words
                        </label>
                        <input 
                            type="text" 
                            class="form-control" 
                            id="kw-exclude-words" 
                        >
                        <p class="form-text">
                            Input repetitive and/or topic words, separated by comma. 
                            Example: For keywords on 'Microsoft Word', input 'microsoft, word'.
                        </p>
                    </div>
                    <div class="d-flex">
                        <div class="flex-grow-1">
                            <span class="me-3">Delimiter:</span>
                            <div class="form-check form-check-inline">
                                <input 
                                    class="form-check-input" 
                                    type="radio" 
                                    id="kw-delimiter-newline"
                                    name="kw-delimiter"
                                    checked
                                >
                                <label 
                                    class="form-check-label" 
                                    for="kw-delimiter-newline"
                                    role="button"
                                >
                                    newline (\n)
                                </label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input 
                                    class="form-check-input" 
                                    type="radio" 
                                    id="kw-delimiter-comma"
                                    name="kw-delimiter"
                                >
                                <label 
                                    class="form-check-label" 
                                    for="kw-delimiter-comma"
                                    role="button"
                                >
                                    comma (,)
                                </label>
                            </div>
                        </div>
                        <button class="btn btn-sm btn-primary" on:click={loadKW}>
                            Confirm
                        </button>
                    </div>
                </div>
                <!-- <div class="my-3 d-flex justify-content-center">
                    <h6>OR</h6>
                </div>
                <div class="bg-tertiary">
                    <h6 class="p-1 bg-primary text-light">Load Project File</h6>
                    <div class="p-2">
                        <div class="input-group">
                            <input type="file" class="form-control form-control-sm" id="load-project-file"
                                aria-describedby="load-project-btn" aria-label="Upload">
                            <button class="btn btn-outline-secondary" type="button"
                                id="load-project-btn">Add</button>
                        </div>
                    </div>
                </div> -->
            </div>
            <div class="modal-footer bg-light">
                <div class="d-flex justify-content-center">
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>